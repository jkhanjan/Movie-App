import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TVshows = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [TVshows, setTVshows] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "KJ Movie | TV Shows /" + category.toUpperCase() ;

  const Gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      setpage(page + 1);

      if (data.results.length > 0) {
        setTVshows((prevstate) => [...prevstate, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false)
      }
      
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const refreshHandler = () => {
    if (TVshows.length === 0) {
      Gettv()
    } else {
      setpage(1);
      setTVshows([]);
      Gettv()
    }
  };

  useEffect(() => {
    refreshHandler()
  }, [category]);


  return TVshows.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between mb-10 mt-3">
        <h1 className=" text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556cd] text-2xl mr-4 ri-arrow-left-line"
          ></i>
          TVshows <span className="text-sm text-zinc-600">({category})</span>
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />

          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={TVshows.length}
        next={Gettv()}
        hasMore={hasMore}
        loader={<h1>loading....</h1>}
      >
        <Cards data={TVshows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TVshows;
