import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line, RiFileList3Line } from "react-icons/ri";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <RiFileList3Line />
          </div>
          <h2>No Applications Yet</h2>
          <p>You have no applications from job seekers at this time.</p>
        </div>
      ) : (
        <>
          <div className="account_components">
            <div className="component-header">
              <h3>Applications For Your Posted Jobs</h3>
              <p>{applications.length} application{applications.length !== 1 ? 's' : ''} found</p>
            </div>
            <div className="applications_container">
              {applications.map((element) => {
                return (
                  <div className="card application-card" key={element._id}>
                    <div className="card-header">
                      <h4>{element.jobInfo.jobTitle}</h4>
                      <span className="application-date">
                        {new Date(element.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="applicant-info">
                      <h5>Applicant Details</h5>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Name</span>
                          <span className="info-value">{element.jobSeekerInfo.name}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Email</span>
                          <span className="info-value">{element.jobSeekerInfo.email}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Phone</span>
                          <span className="info-value">{element.jobSeekerInfo.phone || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Address</span>
                          <span className="info-value">{element.jobSeekerInfo.address || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="cover-letter-section">
                      <h5>Cover Letter</h5>
                      <div className="cover-letter-content">
                        {element.jobSeekerInfo.coverLetter}
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        <RiDeleteBin6Line />
                        Delete Application
                      </button>
                      <Link
                        to={element.jobSeekerInfo?.resume?.url}
                        className="btn btn-primary"
                        target="_blank"
                      >
                        View Resume
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Applications;