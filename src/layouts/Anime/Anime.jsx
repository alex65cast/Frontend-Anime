import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Anime.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { animeTop } from "../../services/apiCalls";

export const Anime = () => {
  const [dataAnime, setDataAnime] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [note, setNote] = useState("");

  const [credentials, setCredentials] = useState({
    // userList: userRdxData.user.id,
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log(selectedAnime, "Soy anime seleccionado");
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
  useEffect(() => {
    console.log(credentials, "soy credentials");
  }, [credentials]);

  useEffect(() => {
    console.log(selectedAnime, "Soy anime seleccionado");
  }, [selectedAnime]);

  useEffect(() => {
    animeTop()
      .then((result) => {
        console.log(result, "SOY RESULT");
        setDataAnime(result.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const displayedAnimes = dataAnime.slice(0, 100);

  const openNoteModal = (anime) => {
    setSelectedAnime(anime);
    setNote(anime.note || "");
    setNoteModalVisible(true);
  };

  const saveNote = () => {
    // Aquí puedes realizar la lógica para guardar la nota en tu backend o en el estado de la aplicación
    console.log("Nota guardada:", note);
    if (selectedAnime) {
      editQuote(selectedAnime._id, credentials, quoteRdxData.credentials)
        .then(() => {
          handleClose();
          setSelectedAnime(null);
          setNoteModalVisible(false);
          // navigate("/appointments");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="animeDesing">
      <div className="cardGrid">
        {displayedAnimes.map((anime) => (
          <div className="cardColumn" key={anime.mal_id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={anime.images.jpg?.image_url} />
              <Card.Body>
                <Card.Title>TOP: {anime.rank}</Card.Title>
                <Card.Title>{anime.title}</Card.Title>
                <Button variant="primary" href={anime.url}>
                  Ver más
                </Button>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setNoteModalVisible(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveNote}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
