import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaEye, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "./ui/Button";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    
    if (!oldPassword) newErrors.oldPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters";
    
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div className="account_components">
      <div className="component-header">
        <div className="header-icon">
          <FaKey />
        </div>
        <div>
          <h3>Update Password</h3>
          <p>Secure your account with a new password</p>
        </div>
      </div>
      
      <form className="password-form" onSubmit={handleUpdatePassword}>
        <div className="form-group">
          <label htmlFor="oldPassword">Current Password</label>
          <div className="input-with-icon">
            <input
              id="oldPassword"
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                if (errors.oldPassword) setErrors({...errors, oldPassword: ""});
              }}
              placeholder="Enter your current password"
              className={errors.oldPassword ? "error" : ""}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.oldPassword && <span className="error-message">{errors.oldPassword}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <div className="input-with-icon">
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword) setErrors({...errors, newPassword: ""});
              }}
              placeholder="Enter your new password"
              className={errors.newPassword ? "error" : ""}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-with-icon">
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({...errors, confirmPassword: ""});
              }}
              placeholder="Confirm your new password"
              className={errors.confirmPassword ? "error" : ""}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        
        <div className="form-actions">
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;