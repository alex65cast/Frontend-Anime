import React, { useState, useEffect } from "react";
import "./Profile.css";

import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";

import { useNavigate } from "react-router-dom";
import { bringUserProfile } from "../../services/apiCalls.js";
import Bun from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Profile = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState({});
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    bringUserProfile(userRdxData.credentials)
      .then((results) => {
        setDatosPerfilUser(results.data);
      })
      .catch((error) => console.log(error));
  }, [datosPerfilUser]);

  return (
    <div className="profileDesign">
      {datosPerfilUser.id !== "" ? (
   
         <Card className="text-center">
         <Card.Header>Perfil de Usuario</Card.Header>
         <Card.Body>
           <Card.Text>Nombre: {datosPerfilUser.name}</Card.Text>
           <Card.Text>Correo: {datosPerfilUser.email}</Card.Text>
           <Card.Text>Fecha de creación: {datosPerfilUser.date}</Card.Text>
         </Card.Body>
         <Card.Footer className="text-muted">{datosPerfilUser.rol}</Card.Footer>
       </Card>
        
      ) : (
        <div>NO HAY DATA</div>
      )}
    </div>
  );
};
