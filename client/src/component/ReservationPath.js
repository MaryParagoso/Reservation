import React, { useEffect, useState } from "react";
import { DatePicker, Form, Select } from "antd";
import { Container, CancelWallpaper } from "../stylesheets/CssCancellation";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import MovieCard from "./movie_card";

const { Option } = Select;

const ReservationPath = () => {
    const [movieList, setMovieList] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);
    const [state, setState] = useState([]);

    const onDateChange = (date) => {
        const selectedDate = date ? new Date(date) : null;
        const formattedDate = selectedDate
            ? format(selectedDate, "yyyy-MM-dd")
            : null;

        if (!formattedDate) {
            setMovieList(state);
            setSelectedDate(null);
            return;
        }

        const filteredList = state.filter((movie) => {
            return movie.startDate && movie.startDate.includes(formattedDate);
        });

        setMovieList(filteredList);
        setSelectedDate(date);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/movies/all"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const movieData = await response.json();

                console.log(movieData);
                setState(movieData);
                setMovieList(movieData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <CancelWallpaper>
                <div
                    style={{
                        paddingTop: "20px",
                        textAlign: "left",
                        marginLeft: "20px",
                    }}
                >
                    <Button
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.816)",
                            width: "40px",
                        }}
                        type="default"
                        icon={<ArrowLeftOutlined />}
                    ></Button>
                </div>
                <h1
                    style={{
                        paddingTop: "80px",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Reservation
                </h1>
                <div
                    style={{
                        justifyContent: "center",
                    }}
                >
                    <Form>
                        <DatePicker onChange={onDateChange} />
                    </Form>
                    <div>
                        {movieList.map((movie, index) => (
                            <MovieCard key={index} movieDetails={movie} />
                        ))}
                    </div>
                </div>
            </CancelWallpaper>
        </Container>
    );
};

export default ReservationPath;
