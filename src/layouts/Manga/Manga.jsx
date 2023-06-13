import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Manga.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { animeTop, mangaTop } from "../../services/apiCalls";

export const Manga = () => {
  const [dataManga, setdataManga] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log(dataManga, "DATA_Manga");
  }, [dataManga]);

  useEffect(() => {
    mangaTop()
      .then((result) => {
        console.log(result, "SOY RESULT");
        setdataManga(result.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const displayedAnimes = dataManga.slice(0, 100);

  return (
    <div className="animeDesing">
      <div className="cardGrid">
        {displayedAnimes.map((manga) => (
          <div className="cardColumn" key={manga.mal_id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={manga.images.jpg.image_url} />
              <Card.Body>
                <Card.Title>TOP: {manga.rank}</Card.Title>
                <Card.Title>{manga.title}</Card.Title>
                <Button variant="primary" href={manga.url}>
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
