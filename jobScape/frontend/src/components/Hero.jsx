import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { RiSearchLine } from "react-icons/ri";

const Hero = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/jobs");
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Find Your Dream <span className="text-gradient">Job</span> Today</h1>
            <h4>
              Connecting Talent with Opportunities Across the Nation for Every Skill
              Level
            </h4>
          </div>
          
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-input-group">
              <div className="input-with-icon">
                <RiSearchLine className="input-icon" />
                <input
                  type="text"
                  placeholder="Job Title, Skills, or Company"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="input-with-icon">
                <RiSearchLine className="input-icon" />
                <input
                  type="text"
                  placeholder="City or Location"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <Button type="submit" className="search-btn">
                Search Jobs
              </Button>
            </div>
          </form>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Jobs Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8K+</span>
              <span className="stat-label">Candidates Hired</span>
            </div>
          </div>
          
          <div className="cta">
            <Button to="/jobs" variant="outline">Browse Jobs</Button>
            <Button to="/dashboard">Post a Job</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;