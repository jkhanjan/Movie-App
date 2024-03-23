import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[8%] h-[170vh] bg-[#1f1e24] w-screen flex flex-col">
      <nav className=" h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556cd] text-2xl mr-4 ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        <div className="w-[20%] ">
          <img
            className=" h-[40vh] object-cover rounded-md"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
          />
          <hr className="mt-10 mb-2 border-none h-[2px] bg-zinc-500" />
          <div className="text-2xl text-white flex gap-x-8">
            <a
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              target="_blank"
            >
              <i class="hover:text-blue ri-global-line"></i>
            </a>
            <a
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              target="_blank"
            >
              <i class="ri-facebook-fill"></i>
            </a>
            <a
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              target="_blank"
            >
              <i class="ri-instagram-fill"></i>
            </a>
            <a
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
              target="_blank"
            >
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>
          <h1 className="text-2xl text-zinc-400 font-semibold my-3">
            Personal Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.birthday}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.birthday ? info.detail.deathday : "Alive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.place_of_birth}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known as
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-3">
            {info.detail.name}
          </h1>
          <h1 className="text-xl text-zinc-400 font-semibold mt-3">
            Biography
          </h1>
          <p className="text-zinc-100 mt-5">{info.detail.biography}</p>
          <h1 className="mt-5 text-lg text-zinc-400 font-semibold">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">
              Acting Career
            </h1>

            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="mt-10 w-full h-[50vh] text-zinc-400 overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,.2)] border-2 border-zinc-600 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-4 duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    Movie :
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block">Character Name: {c.character}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
