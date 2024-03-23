import React, { useEffect, useState } from "react";
import axios from "../../utils/Axios";
import { Link } from "react-router-dom";
import noimage from "../../../public/no.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    GetSerches();
  }, [query]);

  return (
    <div className=" w-[100%] h-[5vh] relative flex items-center">
      <div className="relative w-[87%] items-center">
        <input
          onChange={(e) => setquery(e.target.value)}
          value={query}
          className="w-full border-[1px] border-zinc-400 text-white mx-4 p-2 rounded-3xl text-xl outline-none bg-transparent pl-20"
          type="text"
          placeholder="search anything"
        />
        {query.length > 0 && (
          <i
            onClick={() => setquery("")}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl text-zinc-400 ri-close-line cursor-pointer"
          ></i>
        )}
        <i className="absolute top-1/2 left-10 transform -translate-y-1/2 text-3xl text-zinc-400 ri-search-line"></i>
      </div>
      <div className="z-[100] absolute w-[90%] max-h-[50vh] left-[0%] top-[100%] bg-zinc-100 overflow-auto rounded-lg">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="font-semibold hover:text-black hover:bg-zinc-300 duration-300 text-zinc-700 p-4 w-[100%] flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[12vh] h-[8vh] object-cover mr-5 rounded shadow-md"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span className="flex flex-row justify-between w-full h-full">
              {s.name || s.title || s.original_name || s.original_title}
              <span className="text-zinc-400">
                {s.release_date || "No Info"}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
