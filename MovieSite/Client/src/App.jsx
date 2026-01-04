import Navbar from "./Component/Navbar/Navbar";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarouselSlide from "./Component/Carousel/CarouselSlide";
import MovieList from "./Component/MovieList/MovieList";
import UpcomingMovie from "./Component/MovieList/UpcomingMovie";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <CarouselSlide key="top250-movies" category="top250-movies" />
          }
        />

        <Route
          exact
          path="tv/popular"
          element={
            <MovieList key="most-popular-tv" category="most-popular-tv" />
          }
        />

        <Route
          exact
          path="/movies/upcoming/japan"
          element={<UpcomingMovie key="JP" category="JP" />}
        />

        <Route
          exact
          path="/movies/upcoming/south_korea"
          element={<UpcomingMovie key="KR" category="KR" />}
        />

        <Route
          exact
          path="/movies/upcoming/china"
          element={<UpcomingMovie key="CN" category="CN" />}
        />

        <Route
          exact
          path="/movies/upcoming/france"
          element={<UpcomingMovie key="FR" category="FR" />}
        />

        <Route
          exact
          path="/movies/upcoming/germany"
          element={<UpcomingMovie key="DE" category="DE" />}
        />

        <Route
          exact
          path="/movies/upcoming/switzerland"
          element={<UpcomingMovie key="CH" category="CH" />}
        />
      </Routes>
    </div>
  );
}

export default App;
