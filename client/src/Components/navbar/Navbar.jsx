import React from 'react';
import './Navbar.css';
import clgLogo from '../../assets/images/clg-logo.webp';

const Navbar = () => {
  return (
    <div className="container-fluid">
      <p className="affliciation fs-6 pt-2">Affiliated to Bharathiar University, Coimbatore</p>
      <hr />
      <div className="clgname position-relative">

        <img src={clgLogo} alt="College Logo" className="clg-logo d-block" />
        <h1 className="clgname text-center text-danger fw-bolder">ERODE ARTS AND SCIENCE COLLEGE</h1>
        <p className="text-center fs-6">Autonomous (Co-Education)</p>
      </div>

    </div>

  );
};

export default Navbar;
