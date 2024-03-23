import React from "react";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";

const Header = ({ data }) => {
  return (
    <div>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0, 0.9), rgba(0,0,0, 0.2), rgba(0,0,0, .1)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          })`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
        }}
        className="w-full h-[100vh] flex flex-col justify-end items-start p-[6%]"
      >
        <h1 className="text-7xl font-black text-white">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className="w-[70%] mt-3 text-[1.1rem] text-white mb-3">
          {data.overview.slice(0, 200)}...
          <Link
            to={`/${data.media_type || title}/details/${data.id}`}
            className="text-blue-300"
          >
            more
          </Link>
        </p>
        <p className="text-white">
          <i className="text-yellow-500 ri-megaphone-fill"></i>
          {data.release_date || "No Information"}
          <i className="text-yellow-500 ri-album-fill ml-5"></i>
          {data.media_type.toUpperCase()}
        </p>
        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className="bg-transparent p-3 rounded text-red-500 border-2 border-red-500 font-semibold mt-2 hover:bg-red-500 hover:text-white duration-300"
        >
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Header;
