import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "../Carousel/CarouselSlideStyle.css";
import MovieList from "../MovieList/MovieList";

const CarouselSlide = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const {category} = props;

  const numberOfSlide = 20;

  const fetchMovies = async () => {
    // url details -
    const url = `http://localhost:3000/getMoviesDetails/${category}`;
    const options = {
      method: "GET",
    };
    // fetch data -
    try {
      const response = await fetch(url, options);
      // check response okay or not -
      if (!response.ok) {
        throw new Error("API failed");
      } else {
        const data = await response.json();

        // make slice because only some data show
        setPopularMovies(data.data.slice(0, numberOfSlide));
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  // fetch only one time
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={2}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`https://www.imdb.com/title/${movie.id}`}
              key={movie.id}
            >
              <div className="posterImage">
                <img
                  src={movie ? movie.primaryImage : ""}
                  alt={movie ? movie.originalTitle : ""}
                />
              </div>

              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.originalTitle : ""}
                </div>

                <div className="posterImage__runtime">
                  {movie ? movie.releaseDate : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.numVotes : ""}
                    <i className="fas fa-star" />
                  </span>
                </div>

                <div className="posterImage__description">
                  {movie.description}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>

        <MovieList key="most-popular-movies"
                category="most-popular-movies"/>
      </div>
    </>
  );
};

export default CarouselSlide;
