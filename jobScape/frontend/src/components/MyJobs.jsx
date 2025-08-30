import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { RiDeleteBinLine, RiEditLine, RiBriefcaseLine } from "react-icons/ri";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <RiBriefcaseLine />
          </div>
          <h2>No Jobs Posted Yet</h2>
          <p>You haven't posted any jobs yet. Create your first job posting to get started!</p>
        </div>
      ) : (
        <>
          <div className="account_components">
            <div className="component-header">
              <h3>My Job Postings</h3>
              <p>You've posted {myJobs.length} job{myJobs.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="jobs_container">
              {myJobs.map((element) => (
                <div className="card job-card" key={element._id}>
                  <div className="card-header">
                    <h4>{element.title}</h4>
                    <span className="job-date">
                      Posted on {new Date(element.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="job-details">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Company</span>
                        <span className="detail-value">{element.companyName}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location</span>
                        <span className="detail-value">{element.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Job Type</span>
                        <span className="detail-value">{element.jobType}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Salary</span>
                        <span className="detail-value">{element.salary}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Niche</span>
                        <span className="detail-value">{element.jobNiche}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="job-description">
                    <h5>Job Description</h5>
                    <p>{element.introduction}</p>
                  </div>
                  
                  <div className="card-actions">
                    <button className="btn btn-icon">
                      <RiEditLine />
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-icon"
                      onClick={() => handleDeleteJob(element._id)}
                    >
                      <RiDeleteBinLine />
                      Delete Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyJobs;