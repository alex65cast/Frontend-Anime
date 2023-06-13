import React from 'react';
import "./Body.css"
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Anime } from '../Anime/Anime';
import { Profile } from '../Profile/Profile';


export const Body = () => {

  return (
    <>
        <Routes>
            <Route path="*" element={<Navigate to="/" />}/>
            <Route path='/' element={<Home/>}/> 
            <Route path="/login" element={<Login/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/anime' element={<Anime/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    
    </>
  )
}
