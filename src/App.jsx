import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import TVshows from "./components/TVshows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TVDetails from "./components/TVDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/templates/Trailer";
import Notfound from "./components/Notfound";
import image from "../public/emoji.png";

const App = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 868);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 868);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isDesktop) {
    return (
      <div
        className="w-full flex justify-center items-center  h-screen"
        style={{ backgroundColor: "black" }}
      >
        <h1 className="text-white ">
          <img className="flex items-center" src={image} alt="" />
          This site is only available on desktop view.<br/> Switch to desktop view
        </h1>
      </div>
    ); // Render nothing on mobile
  }

  return (
    <div className="bg-[ linear-gradient(to bottom, #000000, #434343)] w-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<TVshows />} />
        <Route path="/tv/details/:id" element={<TVDetails />} />
        <Route path="/tv/details/:id" element={<TVDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
