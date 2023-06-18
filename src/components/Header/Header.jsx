import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userData } from '../../layouts/userSlice'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../../public/logo1.png";
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header =() => {
    const datosUserRdx = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logMeOut= ()=>{
        dispatch(logout({credentials: {}}));

        setTimeout(()=>{
            navigate("/login");
        },300)
    }
  return (
    <div >
        {['xl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3 headerDesing">
          <Container fluid>
            <Navbar.Brand className="imgLogo" onClick={()=>navigate("/")}><img src={logo} alt='logo.png'></img></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
            {!datosUserRdx?.credentials?.token ? (
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  <Nav.Link className="whiteTitle" onClick={()=>navigate("/")}>Home</Nav.Link>
                  <Nav.Link className="whiteTitle" onClick={()=>navigate("/login")}>Login</Nav.Link>
                  <Nav.Link className="whiteTitle" onClick={() => navigate("/register")}>Register</Nav.Link>
                </Nav>
                ):(
                  <Nav className="justify-content-center flex-grow-1 pe-3">
                    {datosUserRdx.credentials.user.rol === "Admin" &&
                    <Nav.Link className="whiteTitle" onClick={() => navigate("/admin")}>Admin</Nav.Link>
                    }
                  <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
                  <Nav.Link className="whiteTitle" onClick={() =>{ navigate("/profile") 
                  window.location.reload()} }>{datosUserRdx.credentials.user.email}</Nav.Link>
                  <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Browse"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item onClick={()=>{ navigate("/anime") 
                       window.location.reload()}}>Anime top</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>{navigate("/search") 
                         window.location.reload()}}>Search anime</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() =>{ navigate("/profile") 
                        window.location.reload()} }>
                          Profile
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                  <Nav.Link className="whiteTitle" onClick={() => logMeOut()}>Logout</Nav.Link>
                </Nav>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  )
}
