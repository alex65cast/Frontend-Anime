import React, { useState, useEffect } from "react";
import "./SearchAnime.css";
import { Container, Row, Col, Card, Modal, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { addAnimeList, bringStatusAnime, searchAnimes } from "../../services/apiCalls.js";
import buscarIcon from "../../../public/buscar.png";

export const SearchAnime = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);
  const [bringAnime, setBringAnime] = useState("");
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [statusAnime, setStatusAnime] = useState([]);
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    ratingUser: note,
    animeID: selectedAnime ? selectedAnime.mal_id : "",
    rank: selectedAnime ? selectedAnime.rank : "",
    title: selectedAnime ? selectedAnime.title : "",
    imageUrl: "",
    season: selectedAnime ? selectedAnime.season : "",
    statusList: selectedStatusId ? selectedStatusId._id : ""
  });


  const inputHandlerFunction = (value) => {
    setNote(value);
    setCredentials((prevState) => ({
      ...prevState,
      ratingUser: value,
      statusList: selectedStatusId ? selectedStatusId._id : ""
    }));
  };

  const inputHandlerFunctionStatus = (value) => {
    setSelectedStatusId(value)
    setCredentials((prevState) => ({
      ...prevState,
      statusList: value ? value._id : ""

    }));
  };

  const inputHandler = (e) => {
    setBringAnime(e.target.value);
  };

  const openNoteModal = (anime) => {
    setSelectedAnime(anime);
    setNote(anime.ratingUser || "");
    setSelectedStatusId(anime.statusList || "")
    setNoteModalVisible(true);
  };

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    bringStatusAnime(userRdxData.credentials)
      .then((result) => {
        setStatusAnime(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (bringAnime !== "") {
      searchAnimes(bringAnime)
        .then((results) => {
          setDatosPerfilUser(results.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [bringAnime]);

  useEffect(() => {
    if (selectedAnime) {
      setCredentials((prevState) => ({
        ...prevState,
        animeID: selectedAnime.mal_id,
        rank: selectedAnime.rank,
        title: selectedAnime.title,
        imageUrl: selectedAnime.images?.jpg?.image_url,
        season: selectedAnime.season,
      }));
    }
  }, [selectedAnime]);

  const saveAnime = () => {
    if (selectedAnime) {
      const selectedStatusObject = statusAnime.find(
        (status) => status._id === selectedStatusId._id
      );
      const statusListId = selectedStatusObject ? selectedStatusObject._id : "";

      setCredentials((prevState) => ({
        ...prevState,
        statusList: statusListId
      }));

      addAnimeList(credentials, userRdxData.credentials)
        .then(() => {
          setSelectedAnime(null);
          setNoteModalVisible(false);
          alert("Se añadío a la lista")

        })
        .catch((error) => {console.log(error)
          alert("El anime ya está en tu lista.")});
    }
  };

  return (
    <div className="adminDesign">
      <div className="profilesDesing">
        <Container fluid="t" className="topCol justify-content-center">
          <Row>
            <Col>
              <input
                className="buttonDesign"
                type="text"
                name="bringAnime"
                placeholder="buscar"
                onChange={(e) => inputHandler(e)}
              />
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
            {datosPerfilUser.map((anime) => {
              return (
                <div className="cardColumn" key={anime.mal_id}>
                  <Card className="desingAnimeCard">
                    <div className="circle">Rank# {anime.rank}</div>
                    
                    <Card.Img variant="top" src={anime.images.jpg.image_url} />
                    <Card.Body>
                      <Card.Title>TOP: {anime.rank}</Card.Title>
                      <Card.Title>{anime.title}</Card.Title>
                      <Card.Title>Score: {anime.score}</Card.Title>
                      <Button
                        variant="secondary"
                        onClick={() => openNoteModal(anime)}
                      >
                        Editar Nota
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </>
        ) : (
          <div>Cargando...</div>
        )}
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
          <br />
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
          <Button variant="primary" onClick={() => saveAnime()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
