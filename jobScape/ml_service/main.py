import os
import re
from typing import List, Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel

try:
    import spacy
    try:
        nlp = spacy.load("en_core_web_sm")
    except Exception:
        nlp = spacy.blank("en")
except Exception:  # pragma: no cover - spaCy is optional
    spacy = None
    nlp = None

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# The service uses MongoDB to read job postings.
# During tests this connection is not executed, but the code demonstrates
# how to integrate with a running Mongo instance.
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/jobscape")
client = MongoClient(MONGO_URI)
db = client.get_default_database()
jobs_collection = db["jobs"]

app = FastAPI(title="JobScape ML Service")


def _preprocess(text: str) -> str:
    """Lower‑case and remove non alphanumeric characters."""
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    return text


def _vectorize(docs: List[str]):
    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(docs)
    return matrix


class RecommendRequest(BaseModel):
    resume: str
    top_n: Optional[int] = 5


class RecommendResponseItem(BaseModel):
    jobId: str
    title: str
    score: float


class RecommendResponse(BaseModel):
    recommendations: List[RecommendResponseItem]


class SkillRequest(BaseModel):
    resume: str
    category: str


class SkillResponse(BaseModel):
    missing_skills: List[str]


@app.post("/recommend", response_model=RecommendResponse)
async def recommend(data: RecommendRequest):
    """Return top N matching jobs based on cosine similarity."""
    resume_text = _preprocess(data.resume)
    jobs = list(jobs_collection.find({}, {"title": 1, "description": 1}))
    if not jobs:
        return {"recommendations": []}
    docs = [resume_text] + [
        _preprocess(j.get("description", "")) for j in jobs
    ]
    matrix = _vectorize(docs)
    sims = cosine_similarity(matrix[0:1], matrix[1:]).flatten()
    top_indices = sims.argsort()[::-1][: data.top_n]
    recs = []
    for idx in top_indices:
        job = jobs[idx]
        recs.append(
            {
                "jobId": str(job.get("_id")),
                "title": job.get("title", ""),
                "score": float(sims[idx]),
            }
        )
    return {"recommendations": recs}


@app.post("/suggestSkills", response_model=SkillResponse)
async def suggest_skills(data: SkillRequest):
    """Very small demo that compares the resume with a skills list."""
    skills_by_category = {
        "software": {"python", "javascript", "react", "node"},
        "data": {"python", "sql", "pandas", "machine", "learning"},
    }
    required = skills_by_category.get(data.category.lower(), set())
    tokens = set(_preprocess(data.resume).split())
    missing = sorted(list(required - tokens))
    return {"missing_skills": missing}


@app.post("/upload", response_model=RecommendResponse)
async def upload_resume(file: UploadFile = File(...), top_n: int = Form(5)):
    content = await file.read()
    text = content.decode("utf-8", errors="ignore")
    req = RecommendRequest(resume=text, top_n=top_n)
    return await recommend(req)
