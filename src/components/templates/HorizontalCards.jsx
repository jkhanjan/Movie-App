import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from "../../../public/no.jpg";

const HorizontalCards = ({ data }) => {
  const [hoveredCard, sethoveredCard] = useState(null);
  return (
    <div className="w-full flex h-[50vh] overflow-y-hidden p-3 relative">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className={`min-w-[20%] bg-zinc-900 mr-5 mb-10  duration-300 ${
              hoveredCard === i ? "hovered-card" : ""
            }`}
            onMouseEnter={() => sethoveredCard(i)}
            onMouseLeave={() => sethoveredCard(null)}
          >
            <img
              className="w-full h-[100%] object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimage
              }
              alt=""
            />
            <div className=" text-white p-3 h-[35%] overflow-y-hidden absolute bottom-0 ">
              <h1 className="text-[1.2rem] font-black mt-3">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center mt-5">
          Nothing to Show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
