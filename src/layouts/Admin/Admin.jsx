import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import buscarIcon from "../../../public/buscar.png";
import { useNavigate } from "react-router-dom";
import { bringUsersAdmin, deleUser } from "../../services/apiCalls.js";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "./Admin.css";

export const Admin = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);
  const [bringUser, setbringUser] = useState("");
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setbringUser(e.target.value);
  };

  const deleteUser = (person) => {
    console.log(person);
    person.activeUser = false;
    deleUser(person._id, person, userRdxData.credentials)
      .then(() => {
        alert("Se eliminó");
        bringUsersAdmin(userRdxData.credentials)
          .then((results) => {
            setDatosPerfilUser(results.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (bringUser !== "") {
      const bring = setTimeout(() => {
        bringUsersAdmin(userRdxData.credentials, bringUser)
          .then((results) => {
            setDatosPerfilUser(results.data);
          })
          .catch((error) => console.log(error));
      }, 200);

      return () => clearTimeout(bring);
    } else {
      if (datosPerfilUser.length !== 0) {
      } else {
        bringUsersAdmin(userRdxData.credentials)
          .then((results) => {
            setDatosPerfilUser(results.data);
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);

  return (
    <div className="adminDesing">
      <div className="search">
        <Container fluid="t" className="topCol justify-content-center">
          <Row>
            <Col>
              <input
                className="buttonDesign"
                type="text"
                name="bringUser"
                placeholder="buscar"
                onChange={(e) => inputHandler(e)}
              />{" "}
              <img
                className="buscarIcon"
                src={buscarIcon}
                alt="buscarImagen"
              ></img>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="card-grid">
        {datosPerfilUser.length > 0 ? (
          <>
            {datosPerfilUser.map((person) => {
              return (
                <Card className="text-center" key={person._id}>
                  <Card.Header>Perfil de Usuario</Card.Header>
                  <Card.Body>
                    <Card.Text>Nombre: {person.name}</Card.Text>
                    <Card.Text>Correo: {person.email}</Card.Text>
                    <Card.Text>Fecha de creación: {person.date}</Card.Text>
                  </Card.Body>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteUser(person);
                    }}
                  >
                    Delete
                  </Button>{" "}
                  <Card.Footer className="text-muted">{person.rol}</Card.Footer>
                </Card>
              );
            })}
          </>
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </div>
  );
};
