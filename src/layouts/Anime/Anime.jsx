import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Anime.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { animeTop } from "../../services/apiCalls";

export const Anime = () => {
  const [dataAnime, setDataAnime] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log(dataAnime, "DATA_ANIME");
  }, [dataAnime]);

  useEffect(() => {
    animeTop()
      .then((result) => {
        setDataAnime(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
   <div className="animeDesing">
  <div className="cardGrid">
    {dataAnime.data.map((anime) => (
      <Card style={{ width: "18rem" }} key={anime.mal_id}>
        <Card.Img variant="top" src={anime.images.jpg.image_url} />
        <Card.Body>
          <Card.Title>{anime.title}</Card.Title>
          {/* <Card.Text>{anime.synopsis}</Card.Text> */}
          <Button variant="primary" href={anime.url}>
            Ver más
          </Button>
        </Card.Body>
      </Card>
    ))}
  </div>
</div>

  );
};