import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Topnav from "./Topnav";

const SideNav = () => {
  return (
    <div className=" w-full flex justify-around items-center  py-10 px-8 duration-500 absolute">
      <h1 className=" w-[12%]  text-2xl flex text-white font-bold">
        <i className="text-[#6556cd] ri-tv-2-fill text-2xl mr-3"></i>
        <span className="text-2xl mr-2">KJ</span>
      </h1>
      <div className=" w-[50%]">
        <Topnav />
      </div>
      <nav className=" w-[60%] flex text-zinc-200 text-xl">
        <Link
          to="/trending"
          className="hover:bg-red-500 hover:text-white text-red-500 duration-200 rounded-lg p-3"
        >
          <i className="ri-fire-fill mr-2"></i>Trendings
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556cd] hover:text-white duration-200 rounded-lg p-3"
        >
          <i className="mr-2 ri-bard-fill"></i>
          Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#6556cd] hover:text-white duration-200 rounded-lg p-3"
        >
          <i className="ri-movie-fill mr-2"></i>
          Movie
        </Link>
        <Link
          to="/tv"
          className="hover:bg-[#6556cd] hover:text-white duration-200 rounded-lg p-3"
        >
          <i className="mr-2 ri-tv-fill"></i>
          TV shows
        </Link>
        <Link
          to="person"
          className="hover:bg-[#6556cd] hover:text-white duration-200 rounded-lg p-3"
        >
          <i className="ri-user-heart-fill mr-2"></i>
          People
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
