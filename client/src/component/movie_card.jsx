import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton } from "antd";

const { Meta } = Card;

const truncateOverview = (overview) => {
  return overview;
}

function MovieCard({movieDetails, isLoading}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
  const img_300 = "https://image.tmdb.org/t/p/w300";

  const handleCardClick = () => {
    navigate(`/seat-layout`, { state: { data: movieDetails } });
  };

  useEffect(()=>{
    setLoading(isLoading);
  }, [isLoading])

  return (
      <Card
          onClick={handleCardClick}
          cover={
              <img
                  id="movie-image"
                  alt="example"
                  src={
                      movieDetails.image
                  }
              />
          }
          id="movie-card"
      >
          <Meta
              id="movie-card-information"
              title={
                  movieDetails.movieTitle
              }
              description={truncateOverview(movieDetails.startDate)}
          />
      </Card>
  );
}

export default MovieCard;
