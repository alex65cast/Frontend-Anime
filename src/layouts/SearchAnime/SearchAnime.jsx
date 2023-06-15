import React from "react";
import "./SearchAnime.css";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { addAnimeList, bringStatusAnime, searchAnimes } from "../../services/apiCalls.js";
import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const SearchAnime = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);
  const [bringAnime, setBringAnime] = useState("");
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [statusAnime, setStatusAnime] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const userRdxData = useSelector(userData);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    ratingUser: note,
    animeID: selectedAnime ? selectedAnime.mal_id : "",
    rank: selectedAnime ? selectedAnime.rank : "",
    title: selectedAnime ? selectedAnime.title : "",
    imageUrl: "",
    season: selectedAnime ? selectedAnime.season : "",
    statusList: ""
  });

  const inputHandlerFunction = (value) => {
    setNote(value);
    setCredentials((prevState) => ({
      ...prevState,
      ratingUser: value,
      statusList: selectedStatus
    }));
  };

  const inputHandler = (e) => {
    setBringAnime(e.target.value);
  };

  const openNoteModal = (anime) => {
    setSelectedAnime(anime);
    setNote(anime.note || "");
    setNoteModalVisible(true);
  };

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(()=>{
    console.log(credentials,"DATOS ACTUALIZADOS")
  },)

  useEffect(() => {
    bringStatusAnime(userRdxData.credentials)
      .then((result) => {
        console.log(result.data[0], "STATUS DE ANIMES");
        setStatusAnime(result.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (bringAnime !== "") {
      searchAnimes(bringAnime)
        .then((results) => {
          console.log(results.data, "JAJAAJAJ");
          setDatosPerfilUser(results.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [bringAnime]);

  useEffect(() => {
    console.log(selectedAnime, "Soy anime seleccionado");
    if (selectedAnime) {
      setCredentials((prevState) => ({
        ...prevState,
        animeID: selectedAnime.mal_id,
        rank: selectedAnime.rank,
        title: selectedAnime.title,
        imageUrl: selectedAnime.images?.jpg?.image_url,
        season: selectedAnime.season
      }));
    }
  }, [selectedAnime]);

  const saveAnime = () => {
    if (selectedAnime) {
      addAnimeList(credentials, userRdxData.credentials)
        .then(() => {
          setSelectedAnime(null);
          setNoteModalVisible(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="adminDesign">
      <div className="search">
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
          <DropdownButton id="dropdown-basic-button" title="Status">
            <Dropdown.Item
              name="statusList"
              onClick={(e) => {
                setSelectedStatus(e.target.innerText);
                inputHandlerFunction(e.target.innerText);
              }}
            >
              {statusAnime.completed}
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          </DropdownButton>
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
