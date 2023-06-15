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
// import buscarIcon from "../../../public/buscar.png";
import { addAnimeList, searchAnimes } from "../../services/apiCalls.js";
import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const SearchAnime = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);
  const [bringAnime, setbringAnime] = useState("");
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [note, setNote] = useState("");

  const userRdxData = useSelector(userData);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    // userList: "",
    ratingUser: note,
    animeID:selectedAnime ? selectedAnime.mal_id: "",
    rank:selectedAnime ? selectedAnime.rank: "",
    title:selectedAnime ? selectedAnime.title: "",
    imageUrl:"",
    season:selectedAnime ? selectedAnime.season:"",
  });

  const inputHandlerFunction = (value) => {
    setNote(value);
    setCredentials((prevState) => ({
      ...prevState,
      ratingUser: value,
    }));
  };

  const inputHandler = (e) => {
    setbringAnime(e.target.value);
  };

  const openNoteModal = (anime) => {
    setSelectedAnime(anime);
    setNote(anime.note || "");
    setNoteModalVisible(true);
  };
  useEffect(() => {
    console.log(selectedAnime, "Soy anime seleccionado");
    if (selectedAnime) {
      setCredentials((prevState) => ({
        ...prevState,
        // userList: userRdxData.user?.id,
        animeID: selectedAnime.mal_id,
        rank: selectedAnime.rank,
        title: selectedAnime.title,
        imageUrl: selectedAnime.images?.jpg?.image_url,
        season: selectedAnime.season,
      }));
    }
  }, [selectedAnime]);
  useEffect(() => {
    console.log(datosPerfilUser, "HOALALAA");
  }, []);

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    console.log(credentials, "soy credentials");
  }, [credentials]);

  useEffect(() => {
    console.log(selectedAnime, "Soy anime seleccionado");
  }, [selectedAnime]);

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

  const saveAnime = () => {
    // Aquí puedes realizar la lógica para guardar la nota en tu backend o en el estado de la aplicación
    if (selectedAnime) {
      addAnimeList(credentials, userRdxData.credentials)
        .then(() => {
          // handleClose();
          setSelectedAnime(null);
          setNoteModalVisible(false);
          // navigate("/appointments");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="adminDesing">
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
              />{" "}
              {/* <img
                  className="buscarIcon"
                  src={buscarIcon}
                  alt="buscarImagen"
                ></img> */}
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
