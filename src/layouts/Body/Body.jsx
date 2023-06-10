import React from 'react';
import "./Body.css"
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';


export const Body = () => {

  return (
    <>
        <Routes>
            <Route path="*" element={<Navigate to="/" />}/>
            <Route path='/' element={<Home/>}/> 
            <Route path="/login" element={<Login/>} />
        </Routes>
    
    </>
  )
}
