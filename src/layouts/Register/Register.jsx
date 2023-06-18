import React, { useEffect } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/apiCalls";
import { userData } from "../userSlice";
import Container from "react-bootstrap/Container";

export const Register = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phoneNumer: "",
    password: "",
  });

  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const registerMe = () => {
  //   register(credentials)
  //     .then(() => {
  //       navigate("/login");
  //     })
  //     .catch((error) => console.log(error));
  // };
  const registerMe = () => {
    setError(""); // Resetear el error al intentar registrarse nuevamente

    if (!credentials.name || !credentials.email || !credentials.phoneNumer || !credentials.password) {
      setError("Por favor, complete todos los campos");
      return;
    }

    if (credentials.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    register(credentials)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setError("El correo electrónico ya está registrado");
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <div className="registerCar">
        <div className="registerDesign">
          <Form>
           <div className="title">CREAR CUENTA</div>
            <br></br>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="name"
                placeholder="Enter name"
                name="name"
                onChange={inputHandlerFunction}
              />
            </Form.Group>
            <br></br>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={inputHandlerFunction}
              />
            </Form.Group>
            <br></br>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                name="phoneNumer"
                onChange={inputHandlerFunction}
              />
            </Form.Group>
            <br></br>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={inputHandlerFunction}
              />
            </Form.Group>
            {error && <div className="error">{error}</div>}
            <br></br>
            <Button variant="primary" className="button" onClick={() => registerMe()}>
              Acceder
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};
