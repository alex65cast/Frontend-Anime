import React, { useState, useEffect } from "react";
import "./Profile.css";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import {bringAnimeList, bringStatusAnime, bringUserProfile, editAnimeList } from "../../services/apiCalls.js";
import Bun from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";


export const Profile = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState({});
  const [bringAnimes, setbringAnimes] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [statusAnime, setStatusAnime] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);


  const [credentials, setCredentials] = useState({
    ratingUser: note,
 
  });


  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const openNoteModal = (anime) => {
    setSelectedAnime(anime);
    setNote(anime.ratingUser || "");
    setSelectedStatusId(anime.statusList || "")
    setNoteModalVisible(true);
  };

  const inputHandlerFunction = (value) => {
    setNote(value);
    setCredentials((prevState) => ({
      ...prevState,
      ratingUser: value,
    }));
  };
    const inputHandlerFunctionStatus = (value) => {
    setSelectedStatusId(value)
    setCredentials((prevState) => ({
      ...prevState,
      statusList: value

    }));
  };
  useEffect(() => {
    if (selectedAnime) {
      setCredentials((prevState) => ({
        ...prevState,
      }));
    }
  }, [selectedAnime]);

  useEffect(() => {
    bringStatusAnime(userRdxData.credentials)
      .then((result) => {
        setStatusAnime(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
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



  const allAnimes =()=>{
    bringAnimeList(userRdxData.credentials)
      .then((results) => {
        setbringAnimes(results.data);
      })
      .catch((error) => console.log(error));
  }

  const allAnimesCompleted =(status)=>{
  bringAnimeList(userRdxData.credentials)
    .then((results) => {
      // Filtrar por estado si se proporciona
      const filteredAnimes = status ? results.data.filter(anime => anime.statusList?.state === status) : results.data;
      setbringAnimes(filteredAnimes);
    })
    .catch((error) => console.log(error));
  }
  const allAnimesPlaning =(status)=>{
    bringAnimeList(userRdxData.credentials)
      .then((results) => {
        // Filtrar por estado
        const filteredAnimes = status ? results.data.filter(anime => anime.statusList?.state === status) : results.data;
        setbringAnimes(filteredAnimes);
      })
      .catch((error) => console.log(error));
    }

  const modifyAnime = () => {
    if (selectedAnime) {
      editAnimeList(selectedAnime._id,credentials, userRdxData.credentials)
        .then(() => {
          setSelectedAnime(null);
          setNoteModalVisible(false);
          window.location.reload()
        })
        .catch((error) => console.log(error));
    } 
  };
    

  return (
    <div className="profileDesign">
      {datosPerfilUser.id !== "" ? (
        <>
          <Card className="text-center">
            <Card.Header>Perfil de Usuario</Card.Header>
            <Card.Body>
              <Card.Text>Nombre: {datosPerfilUser.name}</Card.Text>
              <Card.Text>Correo: {datosPerfilUser.email}</Card.Text>
              <Card.Text>Fecha de creación: {datosPerfilUser.date}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              {datosPerfilUser.rol}
            </Card.Footer><br></br>
            <Button variant="primary" onClick={()=>allAnimes()}>
                      Ver Animes
            </Button><br></br>
            <Button variant="primary" onClick={() => allAnimesCompleted("Completed")}> 
                        Ver Animes completados
            </Button><br></br>
            <Button variant="primary" onClick={() => allAnimesPlaning("Plan to watch")}> 
                        Ver Animes planeados
            </Button>
          </Card>
          <div className="cardGrid">
            {bringAnimes.map((anime) => (
              <div className="cardColumn" key={anime.animeID}>
                
                <Card className="desingCardAnime">
                <div className="circle">Rank# {anime.rank}</div>

                  <Card.Img variant="top" src={anime.imageUrl} />
                  <Card.Body>
                    <Card.Title>{anime.title}</Card.Title>
                    <Card.Title>Nota: {anime.ratingUser}</Card.Title>
                    <Card.Title>{anime.statusList.state}</Card.Title>

                    <Button
                  variant="secondary"
                  onClick={() => openNoteModal(anime)}
                >
                  Editar Nota
                </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <Modal show={noteModalVisible} onHide={() => setNoteModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNote">
              <Form.Label>Nota (1-10)</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={10}
                name="ratingUser"
                value={note}
                onChange={(e) => inputHandlerFunction(e.target.value)}
              />
            </Form.Group>
          </Form>
          <br></br>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
              {selectedStatusId ? selectedStatusId.state : "Seleccionar Estado"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {statusAnime.map((status) => (
                <Dropdown.Item
                  key={status._id}
                  name="statusList"
                  onClick={() => inputHandlerFunctionStatus(status)}
                >
                  {status.state}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setNoteModalVisible(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={()=>modifyAnime()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
        </>
      ) : (
        <div>NO HAY DATA</div>
      )}
    </div>
  );
};
