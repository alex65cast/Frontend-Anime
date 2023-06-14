import React from "react";
import "./SearchAnime.css";
import { Container } from "react-bootstrap";

import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";

import { useNavigate } from "react-router-dom";
// import buscarIcon from "../../../public/buscar.png";
import { searchAnimes } from "../../services/apiCalls.js";
import Bun from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const SearchAnime = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);
  const [bringAnime, setbringAnime] = useState("");
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setbringAnime(e.target.value);
  };

  useEffect(() => {
    console.log(datosPerfilUser, "HOALALAA");
  }, []);

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
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
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={anime.images.jpg.image_url} />
                    <Card.Body>
                      <Card.Title>TOP: {anime.rank}</Card.Title>
                      <Card.Title>{anime.title}</Card.Title>
                      <Card.Title>Score: {anime.score}</Card.Title>
                      {/* <Button variant="primary" href={anime.url}>
                Ver más
              </Button> */}
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
    </div>
  );
};
