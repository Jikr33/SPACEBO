import { randomInt, randomUUID } from 'crypto';
import React, { useEffect, useRef, useState } from 'react';
import Bullets from './components/Bullets';

import { v4 as uuidv4 } from 'uuid';
import Enemies from './components/Enemies';
import { HeroProps, Bulletye, Enemye } from './types';


const Hero: React.FC<HeroProps> = (props) => {
   const [position, setPosition] = useState({ x: ((window.innerWidth / 2) - (props.heroWidth / 2)), y: (window.innerHeight * 0.8) });

   const [bullets, setBullets] = useState<Bulletye[]>([]);
   const [enemies, setEnemies] = useState<Enemye[]>([])
   const speed = 4;


   useEffect(() => {
      if (props.play) {
         const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            const updatedPosition = { ...position };

            switch (key) {
               case 'ArrowUp':
                  updatedPosition.y = Math.max(position.y - speed, 0);
                  break;
               case 'ArrowDown':
                  updatedPosition.y = Math.min(position.y + speed, window.innerHeight - props.heroHeight);
                  break;
               case 'ArrowLeft':
                  updatedPosition.x = Math.max(position.x - speed, 0);
                  break;
               case 'ArrowRight':
                  updatedPosition.x = Math.min(position.x + speed, window.innerWidth - props.heroWidth);
                  break;
               case ' ':
                  shoot()
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


   }, [position, props.heroHeight, props.heroWidth, props.play]);


   // useEffect(() => {
   //    let lastUpdateTimestamp = performance.now();

   //    const updateBullets = (timestamp: number) => {
   //       const deltaTime = timestamp - lastUpdateTimestamp;

   //       if (deltaTime >= 15) {
   //          setBullets((prevBullets) =>
   //             prevBullets
   //                .map((bullet) => ({
   //                   ...bullet,
   //                   position: {
   //                      x: bullet.position.x,
   //                      y: bullet.position.y - 1 * (deltaTime / 15),
   //                   },
   //                }))
   //                .filter((bullet) => bullet.position.y >= 0)

   //          );

   //          lastUpdateTimestamp = timestamp;
   //       }

   //       requestAnimationFrame(updateBullets);
   //    };

   //    requestAnimationFrame(updateBullets);
   // }, []);

   const centerOfHero = (props.heroWidth / 2 - ((parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.8) / 2))
   const shoot = () => {
      const newBullet: Bulletye = {
         id: uuidv4().slice(0, 4),
         position: { x: position.x + centerOfHero, y: position.y },
      };

      setBullets((prevBullets) => [...prevBullets, newBullet]);
   };

   return (
      // <div
      //    id="hero"
      //    style={{ position: 'absolute', top: position.y, left: position.x }}

      // >
      <>

         {/* <Enemies play={props.play} heroHeight={props.heroHeight} enemies={enemies} setEnemies={setEnemies}></Enemies> */}
         <Bullets setBullets={setBullets} bullets={bullets} enemies={enemies} play={props.play}></Bullets>
      </>
      // </div>
   );
};

export default Hero;


