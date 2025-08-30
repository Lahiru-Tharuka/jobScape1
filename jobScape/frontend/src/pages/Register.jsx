import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLock,
  FaBriefcase,
  FaFileAlt,
  FaUpload
} from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

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
      setResume(file);
      setResumeName(file.name);
    }
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const validateStep1 = () => {
    const newErrors = {};
    if (!role) newErrors.role = "Please select a role";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!firstNiche) newErrors.firstNiche = "Primary niche is required";
    if (!coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";
    if (!resume) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (role === "Job Seeker" && !validateStep2()) return;
    if (!validateStep1()) return;

    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success("Account created successfully!");
      navigateTo("/dashboard");
    }
  }, [dispatch, error, loading, isAuthenticated, message, navigateTo]);

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <RiUserSettingsLine />
            <h1>Join JobScape</h1>
          </div>
          <p>Create your account and start your journey today</p>
        </div>

        <div className="auth-progress">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Basic Info</p>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${role !== 'Job Seeker' ? 'disabled' : ''}`}>
            <span>2</span>
            <p>Job Preferences</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="role">I want to *</label>
                <div className="input-with-icon">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      if (errors.role) setErrors({...errors, role: ""});
                    }}
                    className={errors.role ? "error" : ""}
                  >
                    <option value="">Select your role</option>
                    <option value="Employer">Hire Talent</option>
                    <option value="Job Seeker">Find Jobs</option>
                  </select>
                  <FaUser className="input-icon" />
                </div>
                {errors.role && <span className="error-message">{errors.role}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <div className="input-with-icon">
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({...errors, name: ""});
                    }}
                    className={errors.name ? "error" : ""}
                  />
                  <FaUser className="input-icon" />
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <div className="input-with-icon">
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({...errors, email: ""});
                      }}
                      className={errors.email ? "error" : ""}
                    />
                    <FaEnvelope className="input-icon" />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <div className="input-with-icon">
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({...errors, phone: ""});
                      }}
                      className={errors.phone ? "error" : ""}
                    />
                    <FaPhone className="input-icon" />
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <div className="input-with-icon">
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your complete address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors({...errors, address: ""});
                    }}
                    className={errors.address ? "error" : ""}
                  />
                  <FaMapMarkerAlt className="input-icon" />
                </div>
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-with-icon">
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({...errors, password: ""});
                    }}
                    className={errors.password ? "error" : ""}
                  />
                  <FaLock className="input-icon" />
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
                <div className="password-requirements">
                  <small>Must be at least 6 characters long</small>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={nextStep}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Job Seeker Preferences */}
          {currentStep === 2 && role === "Job Seeker" && (
            <div className="form-step">
              <div className="form-section">
                <h3>Job Preferences</h3>
                <p>Tell us about your skills and preferences</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstNiche">Primary Niche *</label>
                  <div className="input-with-icon">
                    <select
                      id="firstNiche"
                      value={firstNiche}
                      onChange={(e) => {
                        setFirstNiche(e.target.value);
                        if (errors.firstNiche) setErrors({...errors, firstNiche: ""});
                      }}
                      className={errors.firstNiche ? "error" : ""}
                    >
                      <option value="">Select primary niche</option>
                      {nichesArray.map((niche, index) => (
                        <option key={index} value={niche}>{niche}</option>
                      ))}
                    </select>
                    <FaBriefcase className="input-icon" />
                  </div>
                  {errors.firstNiche && <span className="error-message">{errors.firstNiche}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="secondNiche">Secondary Niche</label>
                  <select
                    id="secondNiche"
                    value={secondNiche}
                    onChange={(e) => setSecondNiche(e.target.value)}
                  >
                    <option value="">Select secondary niche</option>
                    {nichesArray.map((niche, index) => (
                      <option key={index} value={niche}>{niche}</option>
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
                    <option value="">Select tertiary niche</option>
                    {nichesArray.map((niche, index) => (
                      <option key={index} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter *</label>
                <textarea
                  id="coverLetter"
                  placeholder="Tell employers about your skills, experience, and why you'd be a great fit..."
                  value={coverLetter}
                  onChange={(e) => {
                    setCoverLetter(e.target.value);
                    if (errors.coverLetter) setErrors({...errors, coverLetter: ""});
                  }}
                  rows={6}
                  className={errors.coverLetter ? "error" : ""}
                />
                {errors.coverLetter && <span className="error-message">{errors.coverLetter}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="resume">Upload Resume *</label>
                <div className="file-upload">
                  <input
                    id="resume"
                    type="file"
                    onChange={resumeHandler}
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="resume" className="file-upload-label">
                    <FaUpload />
                    <span>{resumeName || "Choose resume file"}</span>
                  </label>
                  {errors.resume && <span className="error-message">{errors.resume}</span>}
                  <div className="file-info">
                    <small>PDF or Word document, max 5MB</small>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </div>
          )}

          {/* Employer final step */}
          {currentStep === 2 && role === "Employer" && (
            <div className="form-step">
              <div className="form-section">
                <h3>Almost Done!</h3>
                <p>Review your information and create your account</p>
              </div>

              <div className="review-info">
                <div className="review-item">
                  <span>Name:</span>
                  <span>{name}</span>
                </div>
                <div className="review-item">
                  <span>Email:</span>
                  <span>{email}</span>
                </div>
                <div className="review-item">
                  <span>Phone:</span>
                  <span>{phone}</span>
                </div>
                <div className="review-item">
                  <span>Address:</span>
                  <span>{address}</span>
                </div>
                <div className="review-item">
                  <span>Role:</span>
                  <span>{role}</span>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;