import React, { useEffect, useState } from 'react';
import { controllerProps } from '../types';

const DPadController: React.FC<controllerProps> = ({ position, setPosition, speed, heroSize }) => {
   const [directions, setDirections] = useState({
      up: false,
      down: false,
      left: false,
      right: false
   });

   useEffect(() => {
      const interval = setInterval(() => {
         // Move the enemy based on the active directions
         const updatedPosition = { ...position };
         if (directions.up) {
            updatedPosition.y = Math.max(position.y - speed, 0);
         }
         if (directions.down) {
            updatedPosition.y = Math.min(position.y + speed, window.innerHeight - heroSize.h);
         }
         if (directions.left) {
            updatedPosition.x = Math.max(position.x - speed, 0);
         }
         if (directions.right) {
            updatedPosition.x = Math.min(position.x + speed, window.innerWidth - heroSize.w);
         }
      }, 30);

      return () => {
         clearInterval(interval);
      };
   }, [directions]);

   const handleTouchStart = (e: any, dir: any) => {
      e.preventDefault();
      setDirections(prevDirections => ({
         ...prevDirections,
         [dir]: true
      }));
   };

   const handleTouchMove = (e: any) => {
      e.preventDefault();
      const rect = e.target.getBoundingClientRect();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      const buttonSize = rect.width / 3; // Assuming the buttons are evenly spaced

      const newDirections = {
         up: touchY < rect.top + buttonSize && touchX > rect.left + buttonSize && touchX < rect.right - buttonSize,
         down: touchY > rect.bottom - buttonSize && touchX > rect.left + buttonSize && touchX < rect.right - buttonSize,
         left: touchX < rect.left + buttonSize && touchY > rect.top + buttonSize && touchY < rect.bottom - buttonSize,
         right: touchX > rect.right - buttonSize && touchY > rect.top + buttonSize && touchY < rect.bottom - buttonSize
      };

      setDirections(newDirections);
   };

   const handleTouchEnd = (e: any, dir: any) => {
      e.preventDefault();
      setDirections(prevDirections => ({
         ...prevDirections,
         [dir]: false
      }));
   };

   return (
      <div className="d-pad" onTouchMove={handleTouchMove}>
         <div
            className={`d-pad-button up${directions.up ? ' active' : ''}`}
            onTouchStart={(e) => handleTouchStart(e, 'up')}
            onTouchEnd={(e) => handleTouchEnd(e, 'up')}
         ></div>
         <div
            className={`d-pad-button down${directions.down ? ' active' : ''}`}
            onTouchStart={(e) => handleTouchStart(e, 'down')}
            onTouchEnd={(e) => handleTouchEnd(e, 'down')}
         ></div>
         <div
            className={`d-pad-button left${directions.left ? ' active' : ''}`}
            onTouchStart={(e) => handleTouchStart(e, 'left')}
            onTouchEnd={(e) => handleTouchEnd(e, 'left')}
         ></div>
         <div
            className={`d-pad-button right${directions.right ? ' active' : ''}`}
            onTouchStart={(e) => handleTouchStart(e, 'right')}
            onTouchEnd={(e) => handleTouchEnd(e, 'right')}
         ></div>
      </div>
   );
};

export default DPadController;
