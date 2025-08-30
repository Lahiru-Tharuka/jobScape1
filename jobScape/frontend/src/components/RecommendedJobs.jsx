import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations, fetchSkillSuggestions, clearRecommendationErrors } from "../store/slices/recommendationSlice";
import { toast } from "react-toastify";
import { RiLightbulbFlashLine, RiUserSearchLine } from "react-icons/ri";

const RecommendedJobs = () => {
  const [resume, setResume] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { recommendations, skills, loading, error } = useSelector(
    (state) => state.recommendation
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearRecommendationErrors());
    }
  }, [error, dispatch]);

  const handleRecommend = () => {
    if (resume.trim()) {
      dispatch(fetchRecommendations(resume));
    }
  };

  const handleSkills = () => {
    if (resume.trim() && category.trim()) {
      dispatch(fetchSkillSuggestions(resume, category));
    }
  };

  return (
    <div className="recommended-jobs">
      <div className="component-header">
        <h3>AI Job Recommendations</h3>
        <p>Get personalized job suggestions based on your resume</p>
      </div>
      
      <div className="recommendation-section">
        <div className="section-header">
          <RiLightbulbFlashLine />
          <h4>Get Job Recommendations</h4>
        </div>
        <div className="input-group">
          <textarea
            placeholder="Paste your resume content here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={6}
          />
          <button
            onClick={handleRecommend}
            disabled={loading || !resume.trim()}
            className="btn btn-primary"
          >
            {loading ? "Processing..." : "Get Recommendations"}
          </button>
        </div>
      </div>
      
      <div className="recommendation-section">
        <div className="section-header">
          <RiUserSearchLine />
          <h4>Skill Suggestions</h4>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter job category (e.g., Software Development)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            onClick={handleSkills}
            disabled={loading || !resume.trim() || !category.trim()}
            className="btn btn-secondary"
          >
            {loading ? "Processing..." : "Get Skill Suggestions"}
          </button>
        </div>
      </div>
      
      {recommendations && (
        <div className="results-section">
          <h4>Recommended Jobs</h4>
          <div className="recommendation-results">
            {recommendations}
          </div>
        </div>
      )}
      
      {skills && (
        <div className="results-section">
          <h4>Skill Suggestions</h4>
          <div className="skill-results">
            {skills}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;