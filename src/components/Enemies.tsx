import { stringify } from 'querystring';
import React, { Component, useEffect, useState } from 'react'
import Enemy from './Enemy';

import { v4 as uuidv4 } from 'uuid';
import { EnemiesProps, Enemye } from '../types';

const Enemies: React.FC<EnemiesProps> = (props) => {
   // const [enemies, setEnemies] = useState<Enemye[]>([])


   const enemyPositions = [
      { x: 300, y: -100 },
      { x: 550, y: -150 },
      { x: 800, y: -150 },
      { x: 1050, y: -100 },
   ];

   const generateEnemies = () => {
      const newEnemies: Enemye[] = enemyPositions.map((position) => {
         let power = Math.floor(Math.random() * 3) + 1
         return {
            id: uuidv4().slice(0, 7),
            position,
            speed: 3,
            health: (power !== 3) ? 100 : 170,
            power,
            size: enemySizer(power)
         }
      });

      props.setEnemies((prevEnemies) => [...prevEnemies, ...newEnemies]);
   };
   const enemySizer = (power: number) => {
      var wi = 5
      var he = 4
      if (power === 1) {
         wi = 6
         he = 4
      } else if (power === 3) {
         wi = 8
         he = 5
      }
      return { w: parseFloat(getComputedStyle(document.documentElement).fontSize) * wi, h: parseFloat(getComputedStyle(document.documentElement).fontSize) * he }
   }

   useEffect(() => {
      if (props.play) {
         generateEnemies()

         // Set up the interval to generate enemies every 5 seconds
         const intervalId = setInterval(generateEnemies, 20000);

         // Clean up the interval when the component unmounts
         return () => {
            clearInterval(intervalId);
         };
      }

   }, [props.play]);
   useEffect(() => {
      if (props.play) {
         const intervalId = setInterval(() => {
            props.setEnemies((prevEnemies) =>
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
                        props.setScore(props.score + 10); // Call setScore for enemies with health less than 0
                        return false; // Exclude enemies with health less than or equal to 0 from rendering
                     }
                  })
                  .filter((enemy) => enemy.position.y <= window.innerHeight - enemy.size.h)
            );
            // console.log(enemies, window.innerHeight, window.innerHeight - props.heroHeight)
         }, 100);

         return () => {
            clearInterval(intervalId);
         };
      }
   }, [props.play]);

   const e1 = {
      id: 'sadwad',
      position: { x: 200, y: 200 },
      speed: 22,
      health: 22,
      power: 1,
   }
   const e2 = {
      id: 'ddea',
      position: { x: 500, y: 200 },
      speed: 22,
      health: 22,
      power: 2,
   }
   const e3 = {
      id: 'daeed',
      position: { x: 800, y: 200 },
      speed: 22,
      health: 22,
      power: 3,
   }
   return (
      <div className='h-screen w-screen fixed top-0 left-0'>
         {props.enemies.map((enemy) => (
            // <Enemy key={enemy.id} enemy={enemy}></Enemy>
            <div className={`enemy enemy${enemy.power}`} key={enemy.id} style={{
               left: enemy.position.x,
               top: enemy.position.y
            }}></div>
         ))}
         {/* <Enemy key={'3333'} enemy={e1}></Enemy>
         <Enemy key={'3333sad'} enemy={e2}></Enemy>
         <Enemy key={'333wda3'} enemy={e3}></Enemy> */}
      </div>
   )

}

export default Enemies
