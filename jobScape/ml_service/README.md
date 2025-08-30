# ML Service

This FastAPI service powers the recommendation features of JobScape.

## Running

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

## Endpoints

- `POST /recommend` – accepts JSON with a `resume` field and returns the top
  matching jobs from the MongoDB `jobs` collection.
- `POST /suggestSkills` – returns a list of missing skills for a given resume
  and desired job `category`.

## Training

The initial model uses TF‑IDF vectors and cosine similarity.  To retrain or
extend the model, prepare a CSV file similar to `sample_data/training.csv` and
update the preprocessing or vectorisation steps in `main.py`.  Replace or extend
`skills_by_category` with categories relevant to your platform.

