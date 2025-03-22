import React, { useState } from "react";
import axios from "axios";
import cross_icon from "../../assets/images/cross_icon.png";
import "./NewRegistration.css";

const NewRegistration = ({ setShowStudentRegistration }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    registerNumber: "",
    dob: "",
    bloodGroup: "",
    department: "",
    studentAddress: "",
    clubName: "",
    dateOfJoin: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form data changes
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData); 

    try {
      const response = await axios.post(
        "http://localhost:5100/api/v1/students/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setFormData({
        studentName: "",
        registerNumber: "",
        dob: "",
        bloodGroup: "",
        department: "",
        studentAddress: "",
        clubName: "",
        dateOfJoin: "",
      });

      // On success, display success message
      alert("Student Registered successfully")
      setSuccess(response.data.msg);
      setError(""); 
    } catch (err) {
      // Handle error responses
      if (err.response) {
        setError(err.response.data.msg || "Something went wrong.");
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="student-form">
      <div className="register w-100 card shadow-lg p-4">
        <div className="d-flex justify-content-between align-items-center g-5">
          <h3 className="text-center">Students Club Registration</h3>
          <img
            src={cross_icon}
            alt="Close"
            style={{ cursor: "pointer", width: "24px" }}
            onClick={() => setShowStudentRegistration(false)}
          />
        </div>

        {/* Error and success messages */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="studentName" className="form-label">
                  Student Name:
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  className="form-control"
                  value={formData.studentName}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerNumber" className="form-label">
                  Register Number:
                </label>
                <input
                  type="text"
                  id="registerNumber"
                  name="registerNumber"
                  className="form-control"
                  value={formData.registerNumber}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  DOB:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="form-control"
                  value={formData.dob}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bloodGroup" className="form-label">
                  Blood Group:
                </label>
                <input
                  type="text"
                  id="bloodGroup"
                  name="bloodGroup"
                  className="form-control"
                  value={formData.bloodGroup}
                  onChange={changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Select a Department:
                </label>
                <select
                  id="department"
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={changeHandler}
                  required
                >
                  <option value="" disabled>
                    Choose a department
                  </option>
                  <option value="tamil">Department of Tamil</option>
                  <option value="english">Department of English</option>
                  <option value="mathematics">Department of Mathematics</option>
                  <option value="computer-science">Department of Computer Science</option>
                  <option value="physics">Department of Physics</option>
                  <option value="electronics">Department of Electronics</option>
                  <option value="chemistry">Department of Chemistry</option>
                  <option value="zoology">Department of Zoology</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfJoin" className="form-label">
                  Date of Join:
                </label>
                <input
                  type="date"
                  id="dateOfJoin"
                  name="dateOfJoin"
                  className="form-control"
                  value={formData.dateOfJoin}
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="studentAddress" className="form-label">
                  Address:
                </label>
                <textarea
                  name="studentAddress"  
                  id="studentAddress"  
                  className="form-control"
                  value={formData.studentAddress}
                  onChange={changeHandler}
                  rows="3"
                  required
                ></textarea>
              </div>
            

            <div className="mb-3">
              <label htmlFor="clubName" className="form-label">
                Club Name:
              </label>
              <select
                name="clubName"
                id="clubName"
                className="form-select"
                value={formData.clubName}
                onChange={changeHandler}
                required
              >
                <option value="" disabled>
                  Choose club
                </option>
                <option value="ncc">NCC</option>
                <option value="nss">NSS</option>
                <option value="pt">PT</option>
                <option value="yrc">YRC</option>
                <option value="general-club">GENERAL CLUB</option>
              </select>
            </div>
            <div className="text-center mt-5">
              <button type="submit" className="btn btn-primary btn-lg">
                Register
              </button>
            </div>
          </div>
      </div>
    </form>
      </div >
    </div >
  );
};

export default NewRegistration;
