import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userData } from '../../layouts/userSlice'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header =() => {
    const datosUserRdx = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(datosUserRdx, "DATOS USERRR")
    }, [])

    const logMeOut= ()=>{
        dispatch(logout({credentials: {}}));

        setTimeout(()=>{
            navigate("/login");
        },300)
    }
  return (
    <div>
        {['xl'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 headerDesing">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
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
                  <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
                  <Nav.Link onClick={()=>navigate("/login")}>Login</Nav.Link>
                  <Nav.Link className="link" onClick={() => navigate("/register")}>Register</Nav.Link>
                </Nav>
                ):(
                  <Nav className="justify-content-center flex-grow-1 pe-3">
                    {datosUserRdx.credentials.user.rol === "Admin" &&
                    <Nav.Link className="link" onClick={() => navigate("/admin")}>Admin</Nav.Link>
                    }
                  <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
                  <Nav.Link className="link" onClick={() => navigate("/profile")}>{datosUserRdx.credentials.user.email}</Nav.Link>
                  <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Browse"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item onClick={()=> navigate("/anime")}>Anime top</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=> navigate("/manga")}>Manga top</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          Separated link
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                  <Nav.Link className="link" onClick={() => logMeOut()}>Logout</Nav.Link>
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
