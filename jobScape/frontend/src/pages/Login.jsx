import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaSignInAlt 
} from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!role) newErrors.role = "Please select your role";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    if (!password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    
    try {
      await dispatch(login(formData)).unwrap();
    } catch (err) {
      // Error is handled by the useEffect below
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success("Login successful!");
      navigateTo("/dashboard");
    }
  }, [dispatch, error, isAuthenticated, navigateTo]);

  const handleDemoLogin = (userType) => {
    setRole(userType);
    setEmail(userType === "Employer" ? "demo.employer@jobscape.com" : "demo.seeker@jobscape.com");
    setPassword("demopassword123");
    
    // Auto-submit after a short delay to show the filled form
    setTimeout(() => {
      const formData = new FormData();
      formData.append("role", userType);
      formData.append("email", userType === "Employer" ? "demo.employer@jobscape.com" : "demo.seeker@jobscape.com");
      formData.append("password", "demopassword123");
      dispatch(login(formData));
    }, 1000);
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <RiShieldUserLine />
            <h1>Welcome Back</h1>
          </div>
          <p>Sign in to your JobScape account</p>
        </div>

        {/* Demo Login Buttons */}
        <div className="demo-buttons">
          <button
            type="button"
            className="btn btn-demo employer"
            onClick={() => handleDemoLogin("Employer")}
            disabled={loading}
          >
            <FaUser />
            Demo Employer Login
          </button>
          <button
            type="button"
            className="btn btn-demo seeker"
            onClick={() => handleDemoLogin("Job Seeker")}
            disabled={loading}
          >
            <FaUser />
            Demo Job Seeker Login
          </button>
        </div>

        <div className="divider">
          <span>Or sign in manually</span>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="role">I am a *</label>
            <div className="input-with-icon">
              <select
                id="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (errors.role) setErrors({...errors, role: ""});
                }}
                className={errors.role ? "error" : ""}
                disabled={loading}
              >
                <option value="">Select your role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaUser className="input-icon" />
            </div>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

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
                disabled={loading}
              />
              <FaEnvelope className="input-icon" />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div className="input-with-icon">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({...errors, password: ""});
                }}
                className={errors.password ? "error" : ""}
                disabled={loading}
              />
              <FaLock className="input-icon" />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading || isSubmitting}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Signing in...
              </>
            ) : (
              <>
                <FaSignInAlt />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create account
            </Link>
          </p>
        </div>

        <div className="security-notice">
          <div className="security-icon">🔒</div>
          <p>Your data is securely encrypted and protected</p>
        </div>
      </div>
    </section>
  );
};

export default Login;