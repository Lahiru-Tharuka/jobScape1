import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { CiCircleInfo } from "react-icons/ci";
import Button from "./ui/Button";
import { RiAddLine, RiInformationLine } from "react-icons/ri";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const cities = [
    "All",
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Negombo",
    "Anuradhapura",
    "Ratnapura",
    "Trincomalee",
    "Batticaloa",
    "Matara",
    "Kurunegala",
    "Badulla",
    "Puttalam",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Ampara",
    "Hambantota",
    "Kalutara",
    "Mannar",
    "Kilinochchi",
  ];

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    e.preventDefault();
    if (
      !title ||
      !jobType ||
      !location ||
      !companyName ||
      !introduction ||
      !responsibilities ||
      !qualifications ||
      !jobNiche ||
      !salary
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="account_components">
      <div className="component-header">
        <h3>Post A Job</h3>
        <p>Fill in the details below to post a new job opening</p>
      </div>
      
      <form className="job-post-form" onSubmit={handlePostJob}>
        <div className="form-grid">
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Frontend Developer"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Job Type *</label>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)} required>
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Location (City) *</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} required>
              <option value="">Select Location</option>
              {cities.map((element, index) => {
                return <option value={element} key={index}>{element}</option>;
              })}
            </select>
          </div>
          
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Salary Range *</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g., $50,000 - $80,000"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Job Niche *</label>
            <select value={jobNiche} onChange={(e) => setJobNiche(e.target.value)} required>
              <option value="">Select Job Niche</option>
              {nichesArray.map((element, index) => {
                return <option value={element} key={index}>{element}</option>;
              })}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>Company/Job Introduction *</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Describe your company and this position..."
            rows={5}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Responsibilities *</label>
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="List the key responsibilities for this role..."
            rows={5}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Qualifications *</label>
          <textarea
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="What qualifications and experience are required?"
            rows={5}
            required
          />
        </div>
        
        <div className="form-group">
          <div className="label-with-info">
            <label>What We Offer</label>
            <span className="info-tag">
              <RiInformationLine />
              Optional
            </span>
          </div>
          <textarea
            value={offers}
            onChange={(e) => setOffers(e.target.value)}
            placeholder="What benefits and perks do you offer?"
            rows={4}
          />
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <div className="label-with-info">
              <label>Hiring Multiple Candidates?</label>
              <span className="info-tag">
                <RiInformationLine />
                Optional
              </span>
            </div>
            <select
              value={hiringMultipleCandidates}
              onChange={(e) => setHiringMultipleCandidates(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          
          <div className="form-group">
            <div className="label-with-info">
              <label>Personal Website Name</label>
              <span className="info-tag">
                <RiInformationLine />
                Optional
              </span>
            </div>
            <input
              type="text"
              value={personalWebsiteTitle}
              onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
              placeholder="Website name or title"
            />
          </div>
          
          <div className="form-group">
            <div className="label-with-info">
              <label>Personal Website URL</label>
              <span className="info-tag">
                <RiInformationLine />
                Optional
              </span>
            </div>
            <input
              type="url"
              value={personalWebsiteUrl}
              onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>
        
        <div className="form-actions">
          <Button
            type="submit"
            className="submit-btn"
            disabled={loading}
            loading={loading}
          >
            <RiAddLine />
            Post Job
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPost;