import React, { useEffect, useState } from 'react';
import Bullets from './Bullets';
import Enemies from './Enemies';
import { v4 as uuidv4 } from 'uuid';
import { Bulletye, Enemye } from '../types';


const Game: React.FC = () => {
   const fontSizeRem = parseFloat(getComputedStyle(document.documentElement).fontSize);

   const [highestScore, setHighestScore] = useState(10)
   const [score, setScore] = useState(0)
   const [heroSize, setHeroSize] = useState({ w: 7 * fontSizeRem, h: 5 * fontSizeRem })
   // hero position
   const [position, setPosition] = useState({ x: ((window.innerWidth / 2) - (heroSize.w / 2)), y: (window.innerHeight * 0.8) });

   // game is started or not.
   const [play, setPlay] = useState(false)

   const [bullets, setBullets] = useState<Bulletye[]>([]);
   const [enemies, setEnemies] = useState<Enemye[]>([])
   const speed = 4;

   const [bulletSize, setBulletSize] = useState({ w: fontSizeRem * 1.8, h: fontSizeRem * 2 })

   useEffect(() => {
      if (highestScore < score) {
         setHighestScore(score)
      }
   }, [score])

   useEffect(() => {
      const isMobileOrTablet = window.matchMedia("(max-width: 920px)").matches;
      const isLandscapeMode = window.matchMedia("(orientation: landscape)").matches;

      if (isMobileOrTablet && isLandscapeMode) {
         // Device is a mobile or tablet device in landscape mode
         console.log("Mobile or tablet device in landscape mode");
      } else {
         // Not a mobile or tablet device or not in landscape mode
         console.log("Not a mobile or tablet device in landscape mode");
      }
   }, [])


   useEffect(() => {
      if (play) {
         const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            const updatedPosition = { ...position };

            switch (key) {
               case 'ArrowUp':
                  updatedPosition.y = Math.max(position.y - speed, 0);
                  break;
               case 'ArrowDown':
                  updatedPosition.y = Math.min(position.y + speed, window.innerHeight - heroSize.h);
                  break;
               case 'ArrowLeft':
                  updatedPosition.x = Math.max(position.x - speed, 0);
                  break;
               case 'ArrowRight':
                  updatedPosition.x = Math.min(position.x + speed, window.innerWidth - heroSize.w);
                  break;
               case ' ':
                  shoot()
                  setScore(score + 1)
                  break
               default:
                  break;
            }
            setPosition(updatedPosition);
         };
         window.addEventListener('keydown', handleKeyDown);

         return () => {
            window.removeEventListener('keydown', handleKeyDown);
         };
      }
   }, [position, play]);





   useEffect(() => {
      // let lastUpdateTimestamp = performance.now()
      if (play && (bullets.length !== 0) && (enemies.length !== 0)) {
         console.log(play, bullets, enemies)
         let eneme1 = enemies
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
            setBullets((prevBullets) => prevBullets.filter((bullet) => !checkBulletEnemyCollision(bullet, eneme1)))
         }, 40);

         return () => {
            clearInterval(intervalId);
         };
      }

   }, [enemies])

   const checkBulletEnemyCollision = (bullet: Bulletye, enemiess: Enemye[]): boolean => {
      if (enemiess) {
         for (const enemy of enemiess) {
            if (
               bullet.position.x + bulletSize.w * 0.6 > enemy.position.x && bullet.position.x < enemy.position.x + (enemy.size.w * 0.85) && bullet.position.y < enemy.position.y + enemy.size.h && bullet.position.y + bulletSize.h > enemy.position.y
            ) {
               // Collision detected
               setEnemies((prevEnemies) =>
                  prevEnemies.map((enemy1) =>
                     enemy1.id === enemy.id ? { ...enemy1, health: enemy1.health - 50 } : enemy1
                  )
               );
               // console.log('bullet collided', 'enemy->', enemy.id, enemiess.map((x) => x.id == enemy.id ? 'its collided' : null))
               return true;

            }
         }
      }
      return false;
   };




   const centerOfHero = (heroSize.w / 2 - ((fontSizeRem * 1.8) / 2))
   const shoot = () => {
      const newBullet: Bulletye = {
         id: uuidv4().slice(0, 4),
         position: { x: position.x + centerOfHero, y: position.y },
      };
      setBullets((prevBullets) => [...prevBullets, newBullet]);
   };

   // starts game and removes play button.
   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         const { key } = event;
         switch (key) {
            case 'Enter':
               setPlay(true)
         }
      }
      // setHeroSize({ w: 7 * fontSizeRem, h: 5 * fontSizeRem })
      const startButton = document.getElementById('startButton')
      if (startButton) {
         startButton.style.display = play ? 'none' : 'block'
      }
      // console.log(heroSize)
      window.addEventListener('keydown', handleKeyDown);
      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [play])


   const focus = document.getElementById('gameCont')
   focus?.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
         setPlay(false)
         let s = document.getElementById('startButton2')
         if (s !== null) {
            s.classList.add('flex')
         }
         console.log('not visible')
      }
   });

   return (
      <div id='gameCont' className='bg-slate-500 w-full h-full flex justify-center items-center'>
         <h1 id='title' className='absolute top-0'>SPACEBO</h1>
         <div id="scores">
            <span id="highest">
               Highest Score <h1 id="highest-score">{highestScore}</h1>
            </span>
            <span id="score" className='text-rose-300 text-2xl'>
               My Score <h1 id="score">{score}</h1>
            </span>
         </div>
         {/* <Hero heroHeight={heroSize.h} heroWidth={heroSize.w} play={play}></Hero> */}
         <Enemies score={score} setScore={setScore} play={play} heroHeight={heroSize.h} enemies={enemies} setEnemies={setEnemies}></Enemies>
         <Bullets setBullets={setBullets} bullets={bullets} enemies={enemies} play={play}></Bullets>
         <div id='hero' style={{ position: 'absolute', top: position.y, left: position.x }}></div>

         <span id='startButton' className='h-14 w-22 z-10' onClick={(e) => {
            setTimeout(() => setPlay(true), 100)
         }}>Click here or press Enter</span>
         <span id='startButton2' className='h-14 w-22 z-10 hidden' onClick={(e) => {
            setTimeout(() => setPlay(true), 100)
         }}>Click here or press Enter to Resume</span>
      </div>
   );
};

export default Game;