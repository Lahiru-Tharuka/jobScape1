import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch, FaFilter, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city === "All" ? "" : city, niche === "All" ? "" : niche, searchKeyword));
  }, [dispatch, error, city, niche, searchKeyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchJobs(city === "All" ? "" : city, niche === "All" ? "" : niche, searchKeyword));
  };

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

  const nichesArray = [
    "All",
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

  const clearFilters = () => {
    setCity("All");
    setNiche("All");
    setSearchKeyword("");
    dispatch(fetchJobs("", "", ""));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs-page">
          <div className="container">
            <div className="page-header">
              <h1>Find Your Dream Job</h1>
              <p>Discover opportunities that match your skills and aspirations</p>
            </div>

            {/* Search Bar */}
            <form className="search-bar" onSubmit={handleSearch}>
              <div className="search-input-group">
                <div className="input-with-icon">
                  <FaSearch className="input-icon" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </div>
                <button type="submit" className="search-btn">
                  <FaSearch />
                  Search Jobs
                </button>
              </div>
            </form>

            {/* Filter Toggle for Mobile */}
            <div className="filter-toggle">
              <button 
                className="filter-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                Filters
                {((city && city !== "All") || (niche && niche !== "All")) && (
                  <span className="filter-badge"></span>
                )}
              </button>
            </div>

            <div className="jobs-layout">
              {/* Sidebar Filters */}
              <div className={`filter-sidebar ${showFilters ? 'show' : ''}`}>
                <div className="sidebar-header">
                  <h3>Filters</h3>
                  <button 
                    className="clear-filters"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                </div>

                <div className="filter-group">
                  <h4>
                    <FaMapMarkerAlt />
                    Location
                  </h4>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="filter-select"
                  >
                    {cities.map((cityOption, index) => (
                      <option value={cityOption} key={index}>
                        {cityOption}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <h4>
                    <FaBriefcase />
                    Job Niche
                  </h4>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="filter-select"
                  >
                    {nichesArray.map((nicheOption, index) => (
                      <option value={nicheOption} key={index}>
                        {nicheOption}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="active-filters">
                  {(city && city !== "All") && (
                    <span className="active-filter">
                      {city}
                      <button onClick={() => setCity("All")}>×</button>
                    </span>
                  )}
                  {(niche && niche !== "All") && (
                    <span className="active-filter">
                      {niche}
                      <button onClick={() => setNiche("All")}>×</button>
                    </span>
                  )}
                </div>
              </div>

              {/* Jobs List */}
              <div className="jobs-content">
                <div className="results-header">
                  <h2>
                    {jobs && jobs.length > 0 
                      ? `${jobs.length} Job${jobs.length !== 1 ? 's' : ''} Found`
                      : 'No Jobs Found'
                    }
                  </h2>
                  <div className="sort-options">
                    <span>Sort by: </span>
                    <select>
                      <option value="newest">Newest First</option>
                      <option value="salary">Salary: High to Low</option>
                      <option value="relevance">Relevance</option>
                    </select>
                  </div>
                </div>

                <div className="jobs-container">
                  {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div className="job-card" key={job._id}>
                        <div className="job-header">
                          <div className="company-info">
                            <div className="company-avatar">
                              {job.companyName ? job.companyName.charAt(0).toUpperCase() : 'C'}
                            </div>
                            <div className="job-title-section">
                              <h3 className="job-title">{job.title}</h3>
                              <p className="company-name">{job.companyName}</p>
                            </div>
                          </div>
                          {job.hiringMultipleCandidates === "Yes" ? (
                            <span className="badge badge-primary">
                              Multiple Openings
                            </span>
                          ) : (
                            <span className="badge badge-secondary">
                              Hiring
                            </span>
                          )}
                        </div>

                        <div className="job-details">
                          <div className="detail-item">
                            <FaMapMarkerAlt />
                            <span>{job.location}</span>
                          </div>
                          <div className="detail-item">
                            <FaBriefcase />
                            <span>{job.jobType}</span>
                          </div>
                          <div className="detail-item">
                            <FaMoneyBillWave />
                            <span>Rs. {job.salary}</span>
                          </div>
                          <div className="detail-item">
                            <FaCalendarAlt />
                            <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="job-niche">
                          <span className="niche-tag">{job.jobNiche}</span>
                        </div>

                        <div className="job-description">
                          <p>{job.introduction?.substring(0, 150)}...</p>
                        </div>

                        <div className="job-actions">
                          <Link
                            to={`/post/application/${job._id}`}
                            className="btn btn-primary"
                          >
                            Apply Now
                          </Link>
                          <button className="btn btn-outline">
                            Save Job
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-jobs-found">
                      <div className="no-jobs-content">
                        <img 
                          src="/jobscape.png" 
                          alt="No jobs found" 
                          className="no-jobs-image"
                        />
                        <h3>No jobs match your criteria</h3>
                        <p>Try adjusting your filters or search terms to find more opportunities.</p>
                        <button 
                          className="btn btn-primary"
                          onClick={clearFilters}
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;