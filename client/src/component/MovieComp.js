// MovieComp.js
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 350px;
  box-shadow: 0 10px 40px 0 #aaa;
  cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieName = styled.span`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 7px 0px;
`;

const MovieTime = styled.span`
  font-size: 20pxpx;
  font-weight: bold;
  text-align: center;
  padding-top: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MovieComponent = ({ movie }) => {
  const startDate = new Date(movie.startDate);
  const navigate = useNavigate();

  // Get the formatted date
  const formattedDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const moveToSeatLayout = () => {
    navigate(`/${movie._id}`, { state: { data: movie } });
};

console.log(movie);

  return (
    <MovieContainer
    onClick={moveToSeatLayout}>
      <CoverImage src={movie.image} />
      <MovieName>{movie.movieTitle}</MovieName>
      <InfoColumn>
        <span>Date: {formattedDate}</span>
        <span>Genre: {movie.genre}</span>
        <span>Cinema Number: {movie.cinemaNumber}</span>
        <MovieTime>Time: {movie.time}</MovieTime>
      </InfoColumn>
    </MovieContainer>
  );
};

export default MovieComponent;
