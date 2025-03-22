import {React,useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'aos/dist/aos.css';

import AOS from 'aos';
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Navbar from './Components/navbar/Navbar'

import PrivateRoute from './Components/Private/PrivateRoute';



const App = () => {

    

    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: false,   
        });

       
    }, []);

  
    
    
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Login/>}/>
              
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>
                    }
                />
                
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
