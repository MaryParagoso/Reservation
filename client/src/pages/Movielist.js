import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Appname,
  MovieImage,
  Searchbar,
  SearchIcon,
  MovielistContainer,
  ButtonContainer,
  Button,
  SearchInput,
} from "../stylesheets/Cssmovielist";
import MovieComponent from "../component/MovieComp";
import { useNavigate } from "react-router-dom";

function Movielist({ selectedDate }) {
  const navigate = useNavigate();
  const [searchQuery, updateSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(1); // Default to Cinema 1

  console.log(selectedDate);

  useEffect(() => {
    const dateString = selectedDate;
    const selectedDateObj = new Date(dateString);
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies/all");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const movieData = await response.json();
        const filteredMovies = movieData.filter(
          (movie) =>
            selectedDateObj.getDate() === new Date(movie.startDate).getDate() &&
            selectedDateObj.getMonth() ===
              new Date(movie.startDate).getMonth() &&
            selectedDateObj.getFullYear() ===
              new Date(movie.startDate).getFullYear() &&
            movie.cinemaNumber === selectedCinema
        );
        setDisplayedMovies(filteredMovies);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMovies();
  }, [selectedDate, selectedCinema]);

  const onTextChange = (event) => {
    updateSearchQuery(event.target.value);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const switchCinema = (cinemaNumber) => {
    setSelectedCinema(cinemaNumber);
  };

  const itemsPerPage = 10;

  return (
    <Container>
      <Header>
        <Appname>
          <MovieImage src="/clapperboard.png" alt="Clapperboard" />
          Movie Lists
        </Appname>
        <ButtonContainer>
          <Button onClick={() => switchCinema(1)} active={selectedCinema === 1}>
            Cinema 1
          </Button>
          <Button onClick={() => switchCinema(2)} active={selectedCinema === 2}>
            Cinema 2
          </Button>
          <Button onClick={() => switchCinema(3)} active={selectedCinema === 3}>
            Cinema 3
          </Button>
        </ButtonContainer>
        <Searchbar>
          <SearchIcon src="/magnifying-glass.png" alt="MagnifyingGlass" />
          <SearchInput
            onChange={onTextChange}
            theme={{ searchBarWeight: 2 }}
            placeholder="Search Movies"
          />
        </Searchbar>
      </Header>
      <MovielistContainer>
        {displayedMovies.map((movie, index) => (
          <MovieComponent key={index} movie={movie} />
        ))}
      </MovielistContainer>
    </Container>
  );
}

export default Movielist;
