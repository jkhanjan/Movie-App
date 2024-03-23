import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";

const TVDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0, 0.2), rgba(0,0,0, 0.2), rgba(0,0,0, .7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[230vh] px-[10%]"
    >
      <nav className=" h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556cd] text-2xl mr-4 ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class="hover:text-blue ri-external-link-fill"></i>
        </a>
        <a
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          target="_blank"
        >
          <i class="hover:text-blue ri-global-line"></i>
        </a>
        <a
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          target="_blank"
        >
          imdb
        </a>
      </nav>

      <div className="w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%]">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-5 mb-5 flex text-zinc-100 items-center gap-x-5 ">
            <span className=" rounded-full text-xl font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <h1 className="font-semibold text-2xl w-[60px] leading-5">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(" , ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-2xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-[20px] font-semibold mt-5 text-white">
            Overview
          </h1>
          <p className="text-white">{info.detail.overview}</p>

          <h1 className="text-[20px] font-semibold mt-5 text-white">
            tv Translations
          </h1>
          <p className="w-[100%] text-white mb-7">
            {info.translations.join(" , ")}
          </p>

          <Link
            className=" py-5 px-6 rounded-xl bg-[#6556cd] text-white"
            to={`${pathname}/trailer`}
          >
            <i class="ri-play-fill text-2xl mr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      <div className="w-[80%] flex flex-col gap-y-3 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white ">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white ">
            <h1>Available on rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white ">
            <h1>Available on buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      <hr className="mt-10 border-none h-[2px] bg-zinc-400" />
      <h1 className="text-3xl mt-[5%] font-bold text-white">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.length> 0 ? info.detail.seasons.map((s, i) => (
          <div className="w-[25vw] mr-[1%]">
            <img
              className="min-w-[15vw] h-[35vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
              alt=""
            />
            <h1 className="text-[1.2rem] text-white font-black mt-3 mb-5">
              {s.name ||
                s.title ||
                s.original_name ||
                s.original_title}
            </h1>
          </div>
        )):(
          <h1 className="text-3xl text-white font-black text-center mt-5">
            Nothing to Show
          </h1>
        )}
      </div>

      <hr className="mt-10 border-none h-[2px] bg-zinc-400" />
      <h1 className="text-3xl mt-[3%] font-bold text-white">
        Recommendations & Similars Stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendatons.length > 0 ? info.recommendatons : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TVDetails;
