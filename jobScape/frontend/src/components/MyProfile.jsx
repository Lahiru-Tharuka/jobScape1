import React from "react";
import { useSelector } from "react-redux";
import { RiUserLine, RiMailLine, RiPhoneLine, RiMapPinLine, RiCalendarLine } from "react-icons/ri";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  
  return (
    <div className="account_components">
      <div className="component-header">
        <h3>My Profile</h3>
        <p>Your personal information and account details</p>
      </div>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="profile-info">
            <h2>{user && user.name}</h2>
            <p>{user && user.role}</p>
          </div>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <div className="detail-icon">
              <RiMailLine />
            </div>
            <div className="detail-content">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{user && user.email}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon">
              <RiPhoneLine />
            </div>
            <div className="detail-content">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">{user && user.phone || 'Not provided'}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon">
              <RiMapPinLine />
            </div>
            <div className="detail-content">
              <span className="detail-label">Address</span>
              <span className="detail-value">{user && user.address || 'Not provided'}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon">
              <RiCalendarLine />
            </div>
            <div className="detail-content">
              <span className="detail-label">Member Since</span>
              <span className="detail-value">
                {user && new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {user && user.role === "Job Seeker" && user.niches && (
            <div className="detail-item">
              <div className="detail-icon">
                <RiUserLine />
              </div>
              <div className="detail-content">
                <span className="detail-label">Preferred Job Niches</span>
                <div className="niches-list">
                  {user.niches.firstNiche && (
                    <span className="niche-tag">{user.niches.firstNiche}</span>
                  )}
                  {user.niches.secondNiche && (
                    <span className="niche-tag">{user.niches.secondNiche}</span>
                  )}
                  {user.niches.thirdNiche && (
                    <span className="niche-tag">{user.niches.thirdNiche}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;