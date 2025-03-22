import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const url = "http://localhost:5100/api/v1/auth";
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [role, setRole] = useState('hod'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });


  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(
        `${url}/login`,
        { ...formData },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("Login Response:", response);
      const { token, user } = response.data;


      localStorage.setItem('name', formData.name);
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      

      // Redirect based on role
      if (user.role === 'hod') {
        window.location.href = '/dashboard';
      } else if (user.role === 'staff') {
        window.location.href = '/dashboard';
      } else {
        throw new Error('Unknown role');
      }
    } catch (err) {
      if (err.response) {
        setError("Invalid credentials");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };




  return (
    <div className="row">
      <div className="col-sm-6 appear-left ms-5 p-5 mt-5" data-aos="flip-right">
        <p>STUDENTS</p>
        <p>CLUB</p>
        <p>REGISTRATION</p>
      </div>
      <div className="col-sm-6 appear-right container d-flex justify-content-center mt-5">
        <div className="card shadow-lg p-4">
          <p className="text-center mb-4">Login</p>

          <div className="btn-group w-100 mb-3" role="group">
            <button
              type="button"
              className={`btn ${role === 'hod' ? 'btn-primary' : 'btn-danger'}`}
              onClick={() => setRole('hod')}
            >
              HOD
            </button>
            <button
              type="button"
              className={`btn ${role === 'staff' ? 'btn-primary' : 'btn-danger'}`}
              onClick={() => setRole('staff')}
            >
              Staff
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">
                {role === 'hod' ? 'HOD' : 'Staff'} Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder={`Enter ${role === 'hod' ? 'HOD' : 'Staff'} name`}
                value={formData.name}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Login as {role === 'hod' ? 'HOD' : 'Staff'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


