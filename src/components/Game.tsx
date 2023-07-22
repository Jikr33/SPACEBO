import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import Bullets from "./Bullets";
import Enemies from "./Enemies";
import { v4 as uuidv4 } from "uuid";
import { Bulletye, Enemye } from "../types";
import Mobile from "./Mobile";
import Desktop from "./desktop";
import Stars from "./Stars";
import Music from "./Music";

import fire from "../Assets/fire-1.mp3";

const Game: React.FC = () => {
  const [fontSizeRem, setFont] = useState(
    parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
  const [isMobile, setIsMobile] = useState(false);

  // const [joystickMoving, setjoystickMoving] = useState(false);
  // const [moveRate, setmoveRate] = useState({ x: 0, y: 0 });

  const [highestScore, setHighestScore] = useState(
    parseInt(localStorage.getItem("highscore") || "0")
  );
  const [score, setScore] = useState(0);

  const [heroSize, setHeroSize] = useState({
    w: 7 * fontSizeRem,
    h: 5 * fontSizeRem,
  });
  // hero position
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - heroSize.w / 2,
    y: window.innerHeight * 0.8,
  });

  // game is started or not.
  const [play, setPlay] = useState(false);

  const [bullets, setBullets] = useState<Bulletye[]>([]);
  const [enemies, setEnemies] = useState<Enemye[]>([]);
  const speed = 1 * fontSizeRem;

  const [bulletSize, setBulletSize] = useState({
    w: fontSizeRem * 1.8,
    h: fontSizeRem * 2,
  });
  const [centerOfHero, setCenterOfHero] = useState(
    heroSize.w / 2 - bulletSize.w / 2
  );

  const [shooting, setShooting] = useState(false);

  useEffect(() => {
    if (highestScore < score) {
      setHighestScore(score);
      localStorage.setItem("highscore", String(score));
    }
  }, [score]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 920px)").matches) {
      setFont(parseFloat(getComputedStyle(document.documentElement).fontSize));
      setIsMobile(true);
      setBulletSize({ w: fontSizeRem * 1.2, h: fontSizeRem * 1.4 });
      setHeroSize({ w: 5 * fontSizeRem, h: 4 * fontSizeRem });
      setCenterOfHero((5 * fontSizeRem) / 2 - (fontSizeRem * 1.2) / 2);
      setPosition({
        x: window.innerWidth / 2 - heroSize.w / 2,
        y: window.innerHeight * 0.8,
      });

      const portraitWarning = document.getElementById("ifPortraitMobile");
      if (portraitWarning) {
        portraitWarning.style.display = window.matchMedia(
          "(orientation: landscape)"
        ).matches
          ? "none"
          : "flex";
      }
    } else setIsMobile(false);
  }, [window.innerWidth]);

  useEffect(() => {
    // let lastUpdateTimestamp = performance.now()
    if (play && bullets.length !== 0 && enemies.length !== 0) {
      // console.log(play, bullets, enemies)
      let eneme1 = enemies;
      // const updateBullets = (timestamp: number) => {
      //    const deltaTime = timestamp - lastUpdateTimestamp
      //    let eneme = eneme1
      //    if (deltaTime >= 50) {
      //       setBullets((prevBullets) => prevBullets.filter((bullet) => !checkBulletEnemyCollision(bullet, eneme)))
      //       // console.log('checked')
      //       lastUpdateTimestamp = timestamp;
      //    }
      //    requestAnimationFrame(updateBullets);
      // }
      // requestAnimationFrame(updateBullets);

      const intervalId = setInterval(() => {
        setBullets((prevBullets) =>
          prevBullets.filter(
            (bullet) => !checkBulletEnemyCollision(bullet, eneme1)
          )
        );
      }, 40);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [enemies]);

  const checkBulletEnemyCollision = (
    bullet: Bulletye,
    enemiess: Enemye[]
  ): boolean => {
    if (enemiess) {
      for (const enemy of enemiess) {
        if (
          bullet.position.x + bulletSize.w * 0.6 > enemy.position.x &&
          bullet.position.x < enemy.position.x + enemy.size.w * 0.85 &&
          bullet.position.y < enemy.position.y + enemy.size.h &&
          bullet.position.y + bulletSize.h > enemy.position.y
        ) {
          // Collision detected
          setEnemies((prevEnemies) =>
            prevEnemies.map((enemy1) =>
              enemy1.id === enemy.id
                ? { ...enemy1, health: enemy1.health - 50 }
                : enemy1
            )
          );
          // console.log('bullet collided', 'enemy->', enemy.id, enemiess.map((x) => x.id == enemy.id ? 'its collided' : null))
          return true;
        }
      }
    }
    return false;
  };

  // const centerOfHero = (heroSize.w / 2) - (bulletSize.w / 2)
  const shoot = () => {
    const newBullet: Bulletye = {
      id: uuidv4().slice(0, 4),
      position: { x: position.x + centerOfHero, y: position.y },
    };
    setBullets((prevBullets) => [...prevBullets, newBullet]);
    setScore((prevScore) => prevScore + 1);
    playAudio(fire);
  };

  // // starts game and removes play button.
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     const { key } = event;
  //     switch (key) {
  //       case "Enter":
  //         setPlay(true);
  //     }
  //   };
  //   // setHeroSize({ w: 7 * fontSizeRem, h: 5 * fontSizeRem })
  //   const startButton = document.getElementById("startButton");

  //   // if (startButton) {
  //   //   // startButton.style.display = play ? "none" : "block";
  //   // }
  //   // console.log(heroSize)
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [play]);

  //////////////////
  //////////////

  // Keyboard controls for Desktop
  // const [keys, setKeys] = useState({
  //   w: false,
  //   a: false,
  //   s: false,
  //   d: false,
  //   " ": false,
  // });
  // const throttledEffect = throttle(() => {
  //   let updatedPosition = { ...position };

  //   // console.log("runing");
  //   if (keys.w) {
  //     updatedPosition.y = Math.max(position.y - speed, 0);
  //   }
  //   if (keys.a) {
  //     updatedPosition.x = Math.max(position.x - speed, 0);
  //   }
  //   if (keys.s) {
  //     updatedPosition.y = Math.min(
  //       position.y + speed,
  //       window.innerHeight - heroSize.h
  //     );
  //   }
  //   if (keys.d) {
  //     updatedPosition.x = Math.min(
  //       position.x + speed,
  //       window.innerWidth - heroSize.w
  //     );
  //   }
  //   if (keys[" "]) {
  //     shoot();
  //   }
  //   // Update position for other keys...
  //   setPosition(updatedPosition);
  // }, 5);
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key in keys) {
  //       setKeys((prev) => ({ ...prev, [e.key]: true }));
  //     }
  //   };
  //   const handleKeyUp = (e: KeyboardEvent) => {
  //     setKeys((prev) => ({ ...prev, [e.key]: false }));
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("keyup", handleKeyUp);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, []);
  // const [prevKeys, setPrevKeys] = useState(keys);
  // useEffect(() => {
  //   setPrevKeys(keys);
  //   console.log("keys", keys);
  //   throttledEffect();
  // }, [keys]);

  //////////////////
  //////////////////

  // Joystick controls for mobile
  // useEffect(() => {
  //   // let lastUpdateTimestamp = performance.now()
  //   if (joystickMoving) {
  //     const intervalId = setInterval(() => {
  //       // const newX = position.x + moveRate.x * 10;
  //       // const newY = position.y + moveRate.y * 10;
  //       // setPosition({ x: newX, y: newY });
  //       setPosition((prevPosition) => {
  //         //   {
  //         //   x: prevPosition.x + moveRate.x * 2,
  //         //   y: prevPosition.y + moveRate.y * 1,
  //         // }
  //         // Calculate the new position
  //         const newX = prevPosition.x + moveRate.x * 2;
  //         const newY = prevPosition.y + moveRate.y * 1;
  //         // Check boundaries to ensure the hero stays within the window
  //         const boundedX = Math.max(
  //           0,
  //           Math.min(newX, window.innerWidth - heroSize.w)
  //         );
  //         const boundedY = Math.max(
  //           0,
  //           Math.min(newY, window.innerHeight - heroSize.h)
  //         );
  //         return { x: boundedX, y: boundedY };
  //       });
  //       console.log("intervad", moveRate);
  //     }, 1);
  //     // console.log("moved", moveRate);
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }
  // }, [moveRate]);

  const handleStartButton = (e: any) => {
    let l = document.getElementById("startButton");
    l?.classList.add("enlarge-and-disappear-animation");
    let s = document.getElementById("instructions");
    s?.classList.add("disappear-animation");
  };

  const playAudio = (audio: string) => {
    const audioElement = new Audio(audio);

    // Set the loop attribute to make the audio loop continuously
    // audioElement.loop = false;
    audioElement.volume = 0.3;

    // Play the audio
    audioElement.play();
  };

  return (
    <div
      id="gameCont"
      className="bg-slate-500 w-full h-full flex justify-center items-center overflow-hidden">
      <h1 id="title" className="absolute top-0 z-5">
        SPACEBO
      </h1>
      <div id="scores" className="z-5">
        <span id="highest">
          Highest Score <h1 id="highest-score">{highestScore}</h1>
        </span>
        <span id="score" className="text-rose-300 text-2xl">
          My Score <h1 id="score">{score}</h1>
        </span>
      </div>
      {/* <Hero heroHeight={heroSize.h} heroWidth={heroSize.w} play={play}></Hero> */}
      <Enemies
        isMobile={isMobile}
        score={score}
        setScore={setScore}
        play={play}
        heroHeight={heroSize.h}
        enemies={enemies}
        setEnemies={setEnemies}></Enemies>
      <Bullets
        setBullets={setBullets}
        bullets={bullets}
        enemies={enemies}
        play={play}></Bullets>
      <div
        id="hero"
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          zIndex: 40,
        }}></div>

      {/* {isMobile ? (
        <DPadController
          joystickMoving={joystickMoving}
          moveRate={moveRate}
          position={position}
          setPosition={setPosition}
          setjoyStickMoving={setjoystickMoving}
          setmoveRate={setmoveRate}
          play={!play}></DPadController>
      ) : null} */}
      {/* {isMobile ? (
        <span
          className="fixed right-16 bottom-10 h-24 w-24"
          id="fireButton"
          onClick={shoot}></span>
      ) : null} */}
      {/* <span
        id="ifPortraitMobile"
        className="hidden w-screen h-screen bg-slate-500/90 items-center justify-center fixed left-0 top-0 z-20 text-4xl text-ellipsis text-center">
        Утсаа хэвтээгээр нь тогло
      </span> */}

      {isMobile ? (
        <Mobile
          play={play}
          position={position}
          setPosition={setPosition}
          heroSize={heroSize}
          shoot={shoot}
          shooting={shooting}
          setShooting={setShooting}></Mobile>
      ) : (
        <Desktop
          play={play}
          setPlay={setPlay}
          position={position}
          setPosition={setPosition}
          speed={speed}
          shoot={shoot}
          heroSize={heroSize}></Desktop>
      )}

      {!play ? (
        <span
          id="startButton"
          className="h-14 w-22 z-10 select-none"
          onClick={(e) => {
            setTimeout((e: any) => {
              setPlay(true);
            }, 1000);
            handleStartButton(e);
          }}>
          Click here or press Enter
        </span>
      ) : null}

      {!play ? <div id="instructions"></div> : null}
      <Stars></Stars>
      <Music></Music>
    </div>
  );
};

export default Game;
