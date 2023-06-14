import React, { useState, useEffect } from "react";
import "./Profile.css";

import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";

import { useNavigate } from "react-router-dom";
import { bringAnimeList, bringUserProfile } from "../../services/apiCalls.js";
import Bun from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Profile = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState({});
  const [bringAnimes, setbringAnimes] = useState([]);
  // const [dataAnime, setDataAnime] = useState({});

  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(()=>{
    console.log(bringAnimes,"SOY ANIMES")
  },[])

  useEffect(() => {
    bringUserProfile(userRdxData.credentials)
      .then((results) => {
        setDatosPerfilUser(results.data);
      })
      .catch((error) => console.log(error));
  }, [datosPerfilUser]);

  useEffect(() => {
    bringAnimeList(userRdxData.credentials)
      .then((results) => {
        console.log(results.data);
        setbringAnimes(results.data);
      })
      .catch((error) => console.log(error));
  }, []);

// useEffect(() => {
//     animeId(bringAnimes[.animeID)
//       .then((result) => {
//         console.log(result, "SOY RESULT");
//         setDataAnime(result.data.data);
//       })
//       .catch((error) => console.log(error));
// }, [dataAnime]);
    

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
            </Card.Footer>
          </Card>
          <div>
            {bringAnimes.map((anime) => (
              <div className="cardColumn" key={anime.animeID}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={anime.imageUrl} />
                  <Card.Body>
                    <Card.Title>{anime.title}</Card.Title>
                    <Card.Title>Nota: {anime.ratingUser}</Card.Title>
                    {/* <Button variant="primary" href={anime.url}>
                      Ver más
                    </Button> */}
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>NO HAY DATA</div>
      )}
    </div>
  );
};
