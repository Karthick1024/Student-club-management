import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/forgetpassword.css'

const ForgetPassword = () => {

    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!/^[0-9]{10}$/.test(mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }
        setError("");
        // Handle API call for password reset
        alert("OTP sent to " + mobile);
    };
    return (
        <div className="forget-pass d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4" style={{ width: "24rem" }}>
                <div className="card-header text-center">
                    <h5 className="card-title">Forgot Password</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label ">Registered Mobile Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Enter your mobile number"
                            />
                            {error && <div className="text-danger mt-1">{error}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Send OTP</button>
                        <Link className='d-block  text-center m-3 text-danger text-decoration-none ' to='/'>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
