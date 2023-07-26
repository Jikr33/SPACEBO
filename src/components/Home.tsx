import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScoreBoard from "./ScoreBoard";
import { supabaseAddUser } from "../supas/supabaseAddUser";
const Home: React.FC = () => {
  const [player, setPlayer] = useState(
    localStorage.getItem("playerName") || "player1"
  );

  const addOrUpdatePlayer = async () => {
    const result = await supabaseAddUser(player);
  };

  return (
    <div className="home h-screen w-full grid">
      <span className="bg-transparent w-full flex items-center justify-center">
        <ScoreBoard name={player}></ScoreBoard>
      </span>
      <h1 className="fixed sm:top-1 sm:right-1 top-2 right-2">
        Enjoy the ever lasting space. "{player.toLocaleUpperCase()}"
      </h1>
      <span id="homeBottom">
        {/* <Music></Music> */}
        <h1 id="homeTitle" className="text-3xl font-extrabold mb-20">
          SPACEBO first ever vido game ever. *video
        </h1>

        <div id="nameInput">
          <span id="nameIcon"></span>
          <input
            className="outline-blue-200 rounded h-9 pl-2 w-fit"
            type="text"
            key={"name"}
            value={player}
            placeholder="player name"
            onChange={(e) => {
              setPlayer(e.target.value);
              localStorage.setItem("playerName", e.target.value);
            }}
          />
        </div>

        {player.length <= 2 ? (
          <button
            onClick={() =>
              alert(
                "Name is required and must be at least 3 letters long. \n Тоглогчийн нэр ядаж 3 үсэгтэй байх ёстой."
              )
            }>
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
        ) : (
          <Link to="/game" className="m-6">
            <button onClick={addOrUpdatePlayer}>
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
        )}
      </span>
    </div>
  );
};

export default Home;
