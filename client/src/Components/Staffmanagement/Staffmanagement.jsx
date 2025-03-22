import React, { useState } from "react";
import axios from "axios";
import "./StaffManagement.css";
import cross_icon from "../../assets/images/cross_icon.png";

const StaffManagement = ({ setShowStaffManagement }) => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    joined_date: '', // Updated to match backend
    role: 'staff', // Default role for staff
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5100/api/v1/auth/register',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccess(response.data.msg); // Show success message
      setError(''); // Clear errors
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || 'Something went wrong.');
      } else {
        setError('Unable to connect to the server.');
      }
    }
  };

  return (
    <div className="staff-management-container">
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-4">Manage Staff</h2>
            <img
              src={cross_icon}
              alt="Close"
              style={{ cursor: "pointer", width: "24px" }}
              onClick={() => setShowStaffManagement(false)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter full name"
                value={formData.name}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                value={formData.username}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="joined_date" className="form-label">Joined Year</label>
              <input
                type="number"
                id="joined_date" // Updated to match backend
                className="form-control"
                min="1950"
                max="2100"
                placeholder="YYYY"
                value={formData.joined_date}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                className="form-control"
                value={formData.role}
                onChange={changeHandler}
                required
              >
                <option value="staff">Staff</option>
                <option value="hod">HOD</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Staff
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
