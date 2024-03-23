import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import Topnav from "./templates/Topnav";
import axios from "../utils/Axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";
import Footer from "./Footer";

const Home = () => {
  document.title = "KJ Movies | Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let random =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(random);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallaper();
  }, []);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <div className="w-full h-screen">
      <SideNav />
      <div className="w-[100%] h-screen overflow-auto overflow-x-hidden ">
        <Header data={wallpaper} />

        <div className="p-2 px-6 mt-5 flex justify-between">
          <h1 className="text-4xl font-semibold text-zinc-400">Trending</h1>

          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
        <Footer />
      </div>
      ;
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
