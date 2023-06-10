import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Login.css"
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  // Hook credenciales usuario
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  useEffect(()=>{
    console.log(credentials,"CREDENCIALES?");
  })
  
  useEffect(()=>{
    if(userRdxData.credentials.token){
      navigate("/")
    }
  },[])

  const loginFuction = ()=>{

  }

  return (
    <div className="formDesing">
      <Form>
        <div className="title">LOGIN</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={inputHandlerFunction}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label></Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={inputHandlerFunction}/>
        </Form.Group>
        <Button variant="primary" className="button" onClick={()=>loginFuction()}>
          Login
        </Button>
      </Form>
    </div>
  );
};
