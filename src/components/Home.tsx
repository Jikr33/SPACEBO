import React, { useState } from "react";
import { Link } from "react-router-dom";
import Music from "./Music";
const Home: React.FC = () => {
  const [player, setPlayer] = useState(
    localStorage.getItem("playerName") || "player1"
  );
  return (
    <div className="home h-screen w-full grid">
      <span className="bg-transparent w-full">Real time score board</span>
      <span className="sm:bg-white/80 bg-white/50 flex items-center justify-center">
        <h1 className="fixed sm:top-9 sm:right-4 top-2 right-2">
          Enjoy the ever lasting space. "{player.toLocaleUpperCase()}"
        </h1>

        <div className="h-44 flex justify-evenly flex-col items-center">
          <Music></Music>
          <h1 id="homeTitle" className="text-3xl font-extrabold mb-20">
            SPACEBO first ever vido game ever. *video
          </h1>

          <div id="nameInput">
            <span id="nameIcon"></span>
            <input
              className="outline-blue-200 rounded h-9 pl-2 w-fit"
              type="text"
              key={"name"}
              placeholder="player name"
              onChange={(e) => {
                setPlayer(e.target.value);
                localStorage.setItem("playerName", e.target.value);
              }}
            />
          </div>

          <Link to="/game" className="m-6">
            <button>
              P L A Y
              <div id="clip">
                <div id="lt" className="corner"></div>
                <div id="rb" className="corner"></div>
                <div id="rt" className="corner"></div>
                <div id="lb" className="corner"></div>
              </div>
              <span id="ra" className="arrow"></span>
              <span id="la" className="arrow"></span>
            </button>
          </Link>
        </div>
      </span>
    </div>
  );
};

export default Home;
