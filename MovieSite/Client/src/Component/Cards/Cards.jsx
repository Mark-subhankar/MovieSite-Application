import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../Cards/CardStyle.css";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

const Card = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={1} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`https://www.imdb.com/title/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              className="cards__img"
              src={
                movie?.primaryImage ||
                "https://m.media-amazon.com/images/M/MV5BOGZmZTQ3NzAtOWNkMC00NGViLTlkNTAtYjFlMTY3ZjM5YTgwXkEyXkFqcGc@.jpg"
              }
              alt={movie?.originalTitle || "Movie Poster"}
              onError={(e) => {
                e.target.onerror = null; // prevents infinite loop
                e.target.src =
                  "https://m.media-amazon.com/images/M/MV5BOGZmZTQ3NzAtOWNkMC00NGViLTlkNTAtYjFlMTY3ZjM5YTgwXkEyXkFqcGc@.jpg";
              }}
            />

            <div className="cards__overlay">
              <div className="card__title">
                {movie ? movie.originalTitle : ""}
              </div>
              <div className="card__runtime">
                {movie ? movie.releaseDate : ""}
                <span className="card__rating">
                  {movie ? movie.numVotes : ""}
                  <i className="fas fa-star" />
                </span>
              </div>

              <div className="card__description">
                {movie?.description
                  ? movie.description.slice(0, 118) + "..."
                  : "Description not available"}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
