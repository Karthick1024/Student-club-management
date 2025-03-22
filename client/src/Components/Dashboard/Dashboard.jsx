import React, { useEffect, useState } from 'react';
import Hoddashboard from '../../Pages/Hoddashboard';
import Staffdashboard from '../../Pages/Staffdashboard';

const Dashboard = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    } else {
      
      window.location.href = '/login';
    }
  }, []);

  if (!role) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      {role === 'hod' && <Hoddashboard />}
      {role === 'staff' && <Staffdashboard />}
      {!['hod', 'staff'].includes(role) && <div>Unauthorized Role</div>}
    </div>
  );
};

export default Dashboard;


