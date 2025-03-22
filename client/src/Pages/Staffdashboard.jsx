import { React, useState } from 'react';
import './css/Staffdashboard.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

import NewRegistration from '../Components/home/NewRegistration';


const StaffDashboard = () => {

    const [showStudentRegistration, setShowStudentRegistration] = useState(false);
    const url = "http://localhost:5100/api/v1/auth";

    const navigate = useNavigate();
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

    return (
        <>
            <div className="staff-dashboard-container mt-5 d-flex">
                <div className="staff-menu w-25">
                    <h3 className="text-center mt-5" >
                        Staff Dashboard
                    </h3>
                    <div className="mt-5">
                        <div className="btn-group-vertical w-100" role="group">

                            <button
                                type="button"
                                className="btn btn-primary mb-4"
                                onClick={() => setShowStudentRegistration(true)}
                            >
                                Student Register<span className="add-icon"><FaPlus /></span>
                            </button>


                            <button type="button" onClick={handleLogout} className="btn btn-danger mb-4">
                                Logout <span className="add-icon"><TbLogout2 /></span>
                            </button>

                            {/* Test Button */}
                            <button type="button" className="btn btn-success mb-4">
                                Test <span className="add-icon"><FaPlus /></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-side w-75">
                    {showStudentRegistration && (
                        <NewRegistration setShowStudentRegistration={setShowStudentRegistration} />
                    )}

                </div>
            </div>




        </>
    );
};

export default StaffDashboard;
