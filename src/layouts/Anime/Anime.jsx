import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import "./Anime.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { addAnimeList, animeTop, bringStatusAnime } from "../../services/apiCalls";

export const Anime = () => {
  const [dataAnime, setDataAnime] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [statusAnime, setStatusAnime] = useState([]);

  const userRdxData = useSelector(userData);
  const [credentials, setCredentials] = useState({
    ratingUser: note,
    animeID:selectedAnime ? selectedAnime.mal_id: "",
    rank:selectedAnime ? selectedAnime.rank: "",
    title:selectedAnime ? selectedAnime.title: "",
    imageUrl:"",
    season:selectedAnime ? selectedAnime.season:"",
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

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


  useEffect(() => {
    animeTop()
      .then((result) => {
        setDataAnime(result.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    bringStatusAnime(userRdxData.credentials)
      .then((result) => {
        setStatusAnime(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const displayedAnimes = dataAnime.slice(0, 100);

  const openNoteModal = (anime) => {
    setSelectedAnime(anime);
    setNote(anime.ratingUser || "");
    setSelectedStatusId(anime.statusList || "")
    setNoteModalVisible(true);
  };

  const saveAnime = () => {
    if (selectedAnime) {
      addAnimeList(credentials, userRdxData.credentials)
        .then(() => {
          setSelectedAnime(null);
          setNoteModalVisible(false);
          alert("Se añadío a la lista")
        })
        .catch((error) =>{console.log(error)
           alert("El anime ya está en tu lista.")});
        
    }
  };

  return (
    <div className="animeDesing">
      <div className="cardGrid">
        {displayedAnimes.map((anime) => (
          <div className="cardColumn" key={anime.mal_id}>
            <Card className="desingCardAnim">
              <div className="circle">Rank# {anime.rank}</div>
              <Card.Img variant="top" src={anime.images.jpg?.image_url} />
              <Card.Body>
                <Card.Title>Score: {anime.score}</Card.Title>
                <Card.Title>{anime.title}</Card.Title>
                <Button
                  variant="secondary"
                  onClick={() => openNoteModal(anime)}
                >
                  Añadir
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
          <br/>
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
          <Button variant="primary" onClick={()=>saveAnime()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
