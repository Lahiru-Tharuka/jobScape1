import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";
import Button from "./ui/Button";
import { RiDeleteBinLine, RiFileList3Line, RiCalendarLine } from "react-icons/ri";

const MyApplications = () => {
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
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
          <p>You haven't applied for any jobs yet. Start browsing jobs to apply!</p>
          <Button to="/jobs">Browse Jobs</Button>
        </div>
      ) : (
        <>
          <div className="account_components">
            <div className="component-header">
              <h3>My Job Applications</h3>
              <p>You've applied to {applications.length} job{applications.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="applications_container">
              {applications.map((element) => {
                return (
                  <div className="card application-card" key={element._id}>
                    <div className="card-header">
                      <h4>{element.jobInfo.jobTitle}</h4>
                      <span className="application-date">
                        <RiCalendarLine />
                        Applied on {new Date(element.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="application-status">
                      <span className="status-badge status-pending">Pending</span>
                    </div>
                    
                    <div className="applicant-info">
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Company</span>
                          <span className="info-value">{element.jobInfo.companyName}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Location</span>
                          <span className="info-value">{element.jobInfo.location}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Job Type</span>
                          <span className="info-value">{element.jobInfo.jobType}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Salary</span>
                          <span className="info-value">{element.jobInfo.salary}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="cover-letter-section">
                      <h5>Your Cover Letter</h5>
                      <div className="cover-letter-content">
                        {element.jobSeekerInfo.coverLetter}
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteApplication(element._id)}
                        className="btn-danger"
                      >
                        <RiDeleteBinLine />
                        Withdraw Application
                      </Button>
                      <Button
                        href={element.jobSeekerInfo?.resume?.url}
                        target="_blank"
                      >
                        View Resume
                      </Button>
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

export default MyApplications;