import React, { useEffect, useState } from "react";
import "../MovieList/MovieListStyle.css";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import Card from "../Cards/Cards";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { category } = props;

  const fetchMovies = async () => {
    // start loading
    setLoading(true);
    // start progress bar
    setProgress(25);
    // url details
    const url = `http://localhost:3000/getMoviesDetails/${category}`;

    const options = {
      method: "GET",
    };
    setProgress(50);

    // fetch entire data
    try {
      const response = await fetch(url, options);
      //check response is okay or not
      if (!response.ok) {
        setProgress(100);
        throw new Error("API failed");
      } else {
        setProgress(75);
        const data = await response.json();

        // console.log('data value : ', data.data);
        // data set into - setMovies
        setMovies(data.data);
        // progress end
        setProgress(100);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setTimeout(() => {
        // end loading
        setLoading(false);
        // reset progress bar
        setProgress(0);
      }, 100);
    }
  };

  // here call " fetchMovies " func which is fetch ONLY ONCE
  useEffect(() => {
    fetchMovies();
  }, []);

  // limit movies
  const visibleMovies = movies.slice(0, visibleCount);

  // load more
  const fetchMoreMovies = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div>
      <LoadingBar progress={progress} height={3} color="#f11946" />

      <InfiniteScroll
        dataLength={visibleMovies.length}
        next={fetchMoreMovies}
        hasMore={visibleCount < movies.length}
        loader={<h4>Loading...</h4>}
      >
        <div className="movie__list">
          <h2 className="list__title">{category.toUpperCase()}</h2>

          <div className="list__cards">
            {visibleMovies.map((movie) => (
              <div key={movie.id}>
                <Card movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieList;
