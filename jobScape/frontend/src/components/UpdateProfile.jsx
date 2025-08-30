import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";
import { RiUserSettingsLine, RiUploadCloudLine } from "react-icons/ri";
import Button from "./ui/Button";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [coverLetter, setCoverLetter] = useState(user?.coverLetter || "");
  const [firstNiche, setFirstNiche] = useState(user?.niches?.firstNiche || "");
  const [secondNiche, setSecondNiche] = useState(user?.niches?.secondNiche || "");
  const [thirdNiche, setThirdNiche] = useState(user?.niches?.thirdNiche || "");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    
    if (user?.role === "Job Seeker") {
      if (!coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    
    if (user?.role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }
    
    if (resume) {
      formData.append("resume", resume);
    }
    
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile updated successfully");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, error, isUpdated, user]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setResumePreview(reader.result);
        setResume(file);
      };
    }
  };

  return (
    <div className="account_components">
      <div className="component-header">
        <div className="header-icon">
          <RiUserSettingsLine />
        </div>
        <div>
          <h3>Update Profile</h3>
          <p>Keep your information up to date</p>
        </div>
      </div>
      
      <form className="profile-form" onSubmit={handleUpdateProfile}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({...errors, name: ""});
              }}
              placeholder="Enter your full name"
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({...errors, email: ""});
              }}
              placeholder="Enter your email address"
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
        </div>

        {user?.role === "Job Seeker" && (
          <>
            <div className="form-section">
              <h4>Job Preferences</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstNiche">Primary Niche</label>
                  <select
                    id="firstNiche"
                    value={firstNiche}
                    onChange={(e) => setFirstNiche(e.target.value)}
                  >
                    <option value="">Select a niche</option>
                    {nichesArray.map((element, index) => (
                      <option value={element} key={index}>{element}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="secondNiche">Secondary Niche</label>
                  <select
                    id="secondNiche"
                    value={secondNiche}
                    onChange={(e) => setSecondNiche(e.target.value)}
                  >
                    <option value="">Select a niche</option>
                    {nichesArray.map((element, index) => (
                      <option value={element} key={index}>{element}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="thirdNiche">Tertiary Niche</label>
                  <select
                    id="thirdNiche"
                    value={thirdNiche}
                    onChange={(e) => setThirdNiche(e.target.value)}
                  >
                    <option value="">Select a niche</option>
                    {nichesArray.map((element, index) => (
                      <option value={element} key={index}>{element}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter *</label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => {
                  setCoverLetter(e.target.value);
                  if (errors.coverLetter) setErrors({...errors, coverLetter: ""});
                }}
                placeholder="Write a compelling cover letter that highlights your skills and experience"
                rows={6}
                className={errors.coverLetter ? "error" : ""}
              />
              {errors.coverLetter && <span className="error-message">{errors.coverLetter}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="resume">Upload Resume</label>
              <div className="file-upload">
                <input
                  id="resume"
                  type="file"
                  onChange={resumeHandler}
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="resume" className="file-upload-label">
                  <RiUploadCloudLine />
                  <span>{resume ? resume.name : "Choose file"}</span>
                </label>
                <div className="file-info">
                  <small>PDF or Word document, max 5MB</small>
                </div>
              </div>
              
              {user?.resume?.url && (
                <div className="current-resume">
                  <p>Current Resume:</p>
                  <Link
                    to={user.resume.url}
                    target="_blank"
                    className="resume-link"
                  >
                    View Current Resume
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
        
        <div className="form-actions">
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;