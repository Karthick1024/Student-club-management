import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Pages/css/Hoddashboard.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import StaffManagement from "../components/StaffManagement/StaffManagement";
import NewRegistration from "../Components/home/NewRegistration";

const HODDashboard = () => {
  const [showStaffManagement, setShowStaffManagement] = useState(false);
  const [showStudentRegistration, setShowStudentRegistration] = useState(false);
  const url = "http://localhost:5100/api/v1/auth";
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("studentName");
  const studentsUrl = "http://localhost:5100/api/v1/students";

  const navigate = useNavigate();


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${studentsUrl}/filter`);
        // console.log("Fetched Students:", response.data);
        if (response.data) {
          setStudents(response.data);
          setFilteredStudents(response.data);
          // console.log("Students State:", students);
          // console.log("Filtered Students State:", filteredStudents);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);



  const handleTabClick = (tabName) => {
    if (tabName === "staffManagement") {
      setShowStaffManagement(!showStaffManagement);
      setShowStudentRegistration(false);
    } else if (tabName === "studentRegistration") {
      setShowStudentRegistration(!showStudentRegistration);
      setShowStaffManagement(false);
    }
  };





  const handleLogout = async () => {
    try {

      await axios.get(`${url}/logout`, {}, {
        withCredentials: true,

      });


      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('role');



      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = students.filter((student) =>
      student[searchField]?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="hod-dashboard-container mt-5 d-flex">
      <div className="hod-menu w-25">
        <h3 className="text-center mt-5">HOD Dashboard</h3>
        <div className="mt-5">
          <div className="btn-group-vertical w-100" role="group">
            <button
              type="button"
              className="btn btn-danger mb-4"
              onClick={() => handleTabClick("studentRegistration")}
            >
              Student Register <span className="add-icon"><FaPlus /></span>
            </button>
            <button
              type="button"
              className="btn btn-success mb-4"
              onClick={() => handleTabClick("staffManagement")}
            >
              Add New Staff <span className="add-icon"><FaPlus /></span>
            </button>
            <button type="button" onClick={handleLogout} className="btn btn-primary mb-4">
              Logout <span className="add-icon"><TbLogout2 /></span>
            </button>
          </div>
        </div>
      </div>

      <div className="hod-content w-75">

        {!showStaffManagement && !showStudentRegistration && (
          <>
            <div className="search-bar mb-4 d-flex align-items-center">
              <select
                className="form-select me-2"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option value="" disabled>Select Field</option>
                <option value="studentName">Name</option>
                <option value="registerNumber">Register Number</option>
                <option value="department">Department</option>
                <option value="bloodGroup">Blood Group</option>
                <option value="clubName">Club Name</option>
              </select>
              <input
                type="text"
                className="form-control me-2"
                placeholder={searchField ? `Search by ${searchField}` : "Select a field first"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                type="submit"
                className="btn btn-primary"
                disabled={!searchField || !searchQuery.trim()}
              >
                <FaSearch />
              </button>
            </div>


            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Register Number</th>
                  <th>Department</th>
                  <th>Blood Group</th>
                  <th>Club</th>
                  <th>Address</th>
                  <th>Date of Join</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.registerNumber}>
                      <td>{student.studentName}</td>
                      <td>{student.registerNumber}</td>
                      <td>{student.department}</td>
                      <td>{student.bloodGroup}</td>
                      <td>{student.clubName}</td>
                      <td>{student.studentAddress}</td>
                      <td>{new Date(student.dateOfJoin).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>


            </table>
          </>
        )}

        {showStaffManagement && <StaffManagement setShowStaffManagement={setShowStaffManagement} />}
        {showStudentRegistration && (
          <NewRegistration setShowStudentRegistration={setShowStudentRegistration} />
        )}
      </div>
    </div>
  );
};

export default HODDashboard;

