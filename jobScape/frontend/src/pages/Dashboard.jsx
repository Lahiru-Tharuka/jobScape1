import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";
import RecommendedJobs from "../components/RecommendedJobs";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, navigateTo]);

  const renderComponent = () => {
    switch (componentName) {
      case "My Profile":
        return <MyProfile />;
      case "Update Profile":
        return <UpdateProfile />;
      case "Update Password":
        return <UpdatePassword />;
      case "Job Post":
        return <JobPost />;
      case "My Jobs":
        return <MyJobs />;
      case "Applications":
        return <Applications />;
      case "My Applications":
        return <MyApplications />;
      case "Recommended Jobs":
        return <RecommendedJobs />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <section className="dashboard">
      <div className="dashboard-container">
        <div className={`dashboard-sidebar ${show ? "show" : ""}`}>
          <div className="sidebar-header">
            <div className="user-info">
              <h3>Welcome, {user?.name}</h3>
              <p className="user-role">{user?.role}</p>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <h4>Manage Account</h4>
            <ul className="nav-menu">
              <li>
                <button
                  className={componentName === "My Profile" ? "active" : ""}
                  onClick={() => setComponentName("My Profile")}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  className={componentName === "Update Profile" ? "active" : ""}
                  onClick={() => setComponentName("Update Profile")}
                >
                  Update Profile
                </button>
              </li>
              <li>
                <button
                  className={componentName === "Update Password" ? "active" : ""}
                  onClick={() => setComponentName("Update Password")}
                >
                  Update Password
                </button>
              </li>

              {user?.role === "Employer" && (
                <>
                  <li>
                    <button
                      className={componentName === "Job Post" ? "active" : ""}
                      onClick={() => setComponentName("Job Post")}
                    >
                      Post New Job
                    </button>
                  </li>
                  <li>
                    <button
                      className={componentName === "My Jobs" ? "active" : ""}
                      onClick={() => setComponentName("My Jobs")}
                    >
                      My Jobs
                    </button>
                  </li>
                  <li>
                    <button
                      className={componentName === "Applications" ? "active" : ""}
                      onClick={() => setComponentName("Applications")}
                    >
                      Applications
                    </button>
                  </li>
                </>
              )}

              {user?.role === "Job Seeker" && (
                <>
                  <li>
                    <button
                      className={componentName === "My Applications" ? "active" : ""}
                      onClick={() => setComponentName("My Applications")}
                    >
                      My Applications
                    </button>
                  </li>
                  <li>
                    <button
                      className={componentName === "Recommended Jobs" ? "active" : ""}
                      onClick={() => setComponentName("Recommended Jobs")}
                    >
                      Recommended Jobs
                    </button>
                  </li>
                </>
              )}

              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-header">
            <button
              className="sidebar-toggle"
              onClick={() => setShow(!show)}
            >
              <LuMoveRight />
            </button>
            <h1>{componentName}</h1>
          </div>

          <div className="dashboard-main">
            {renderComponent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;