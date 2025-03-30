
import React from 'react';
import './Navbar.css';
import clgLogo from '../../assets/images/clg-logo.webp';

const Navbar = () => {
  return (
    <div className="container-fluid header-content">
      <p className="affliciation fs-6 pt-2 text-white">Affiliated to Bharathiar University, Coimbatore</p>
      <hr className='divider'/>
      
      <div className="clgname-container d-flex flex-column flex-md-row align-items-center">
        <img src={clgLogo} alt="College Logo" className="clg-logo" />
        <div className="text-container text-center text-md-start">
          <h1 className="clgname text-danger fw-bolder text-white">ERODE ARTS AND SCIENCE COLLEGE</h1>
          <p className="fs-6 text-white text-center">Autonomous (Co-Education)</p>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Navbar;
