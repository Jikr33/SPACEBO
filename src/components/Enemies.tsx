import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { EnemiesProps, Enemye } from "../types";

const Enemies: React.FC<EnemiesProps> = ({
  play,
  heroHeight,
  enemies,
  setEnemies,
  setScore,
  score,
  isMobile,
  life,
  setLife,
}) => {
  // const [enemies, setEnemies] = useState<Enemye[]>([])
  // const enemyPositions = [
  //    { x: 300, y: -100 },
  //    { x: 550, y: -150 },
  //    { x: 800, y: -150 },
  //    { x: 1050, y: -100 },
  // ];

  const generateRandomEnemyPositions = (minX: number, maxX: number) => {
    let numEnemies = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
    const enemyPositions = [];

    for (let i = 0; i < numEnemies; i++) {
      const randomX = Math.random() * (maxX - minX) + minX;
      const randomY = -(Math.floor(Math.random() * (150 - 100 + 1)) + 100);
      enemyPositions.push({ x: randomX, y: randomY });
    }
    return enemyPositions;
  };

  const generateEnemies = () => {
    const newEnemies: Enemye[] = generateRandomEnemyPositions(
      30,
      window.innerWidth * 0.93
    ).map((position) => {
      let power = Math.floor(Math.random() * 3) + 1;
      return {
        id: uuidv4().slice(0, 7),
        position,
        speed: 3,
        health: power !== 3 ? 100 : 170,
        power,
        size: enemySizer(power),
      };
    });

    setEnemies((prevEnemies) => [...prevEnemies, ...newEnemies]);
  };
  const enemySizer = (power: number) => {
    var wi = 5;
    var he = 4;
    if (isMobile) {
      if (power === 1) {
        wi = 4;
        he = 3;
      } else if (power === 3) {
        wi = 7;
        he = 4;
      }
    } else {
      if (power === 1) {
        wi = 6;
        he = 4;
      } else if (power === 3) {
        wi = 8;
        he = 5;
      }
    }
    return {
      w: parseFloat(getComputedStyle(document.documentElement).fontSize) * wi,
      h: parseFloat(getComputedStyle(document.documentElement).fontSize) * he,
    };
  };

  useEffect(() => {
    if (play) {
      generateEnemies();

      // Set up the interval to generate enemies every 5 seconds
      const intervalId = setInterval(generateEnemies, 5000);

      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [play]);
  useEffect(() => {
    if (play) {
      const intervalId = setInterval(() => {
        setEnemies((prevEnemies) =>
          prevEnemies
            .map((enemy) => ({
              ...enemy,
              position: {
                x: enemy.position.x,
                y: enemy.position.y + 3, // Adjust the movement speed as desired
              },
            }))
            // .filter((enemy) => (enemy.health > 0) ? null : props.setScore(props.score + 10))
            .filter((enemy) => {
              if (enemy.health > 0) {
                return true; // Render enemies with health greater than 0
              } else {
                console.log("score.", score);
                setScore((prevScore) => prevScore + 10 * enemy.power); // Call setScore for enemies with health less than 0
                return false; // Exclude enemies with health less than or equal to 0 from rendering
              }
            })
            .filter((enemy) => {
              if (!(enemy.position.y <= window.innerHeight + enemy.size.h)) {
                setLife((prevLife) => prevLife - enemy.power * 10);
                console.log(life, "dies");
                return false;
              }
              return true;
            })
        );
        // console.log(enemies, window.innerHeight, window.innerHeight - props.heroHeight)
      }, 100);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [play]);

  const s = [
    {
      id: "enemy1",
      position: { x: 10, y: 30 },
      speed: 5,
      health: 100,
      power: 1,
      size: enemySizer(1),
    },

    {
      id: "enemy2",
      position: { x: 200, y: 30 },
      speed: 3,
      health: 80,
      power: 2,
      size: enemySizer(2),
    },

    {
      id: "enemy3",
      position: { x: 350, y: 30 },
      speed: 4,
      health: 120,
      power: 3,
      size: enemySizer(3),
    },
  ];

  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-30">
      {enemies.map((enemy) => (
        <div
          className={`enemy enemy${enemy.power}`}
          key={enemy.id}
          style={{
            left: enemy.position.x,
            top: enemy.position.y,
          }}></div>
      ))}
      {/* {s.map((enemy) => (
            <div className={`enemy enemy${enemy.power}`} key={enemy.id} style={{
               left: enemy.position.x,
               top: enemy.position.y
            }}></div>
         ))} */}
    </div>
  );
};

export default Enemies;
