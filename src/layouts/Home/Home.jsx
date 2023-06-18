import React from 'react'
import "./Home.css";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='desingHome'>
          <Carousel>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://static.crunchyroll.com/fms/landscape_poster/960x540/8232c9e9-525d-419f-ab0a-d39469644b1f.png"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://static.crunchyroll.com/fms/landscape_poster/960x540/e8aa94e6-49e7-4af3-909e-6ca1e0bc0168.png"
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://static.crunchyroll.com/fms/landscape_poster/960x540/aeb947c3-03a9-4acc-abd6-68562cfa287f.png"
          alt="Third slide"
        />

      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://static.crunchyroll.com/fms/landscape_poster/960x540/a48d1f07-1ed9-4eeb-9d63-569685cb45ba.png"
          alt="four slide"
        />

      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://static.crunchyroll.com/fms/landscape_poster/960x540/12d6bc46-2f5c-4691-a028-209f8f1abcfd.png"
          alt="five slide"
        />

      </Carousel.Item>
    </Carousel>

    <br></br>
    <Button variant="primary" size="lg" onClick={()=> navigate("/anime")}>
          Comienza ya!
    </Button>{' '}
    </div>
  )
}
