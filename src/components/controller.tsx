import React, { useEffect, useState } from 'react';
import { controllerProps } from '../types';
import { Joystick } from 'react-joystick-component';
import { url } from 'inspector';

const DPadController: React.FC<controllerProps> = ({ inactive, setjoyStickMoving, setmoveRate, handleJoystickMove }) => {
   // const [move, setMove] = useState(false)
   // const [moveRate, setMoveRate] = useState({ x: 0, y: 0 })
   const handleMove = (e: any) => {
      // setMove(true)
      handleJoystickMove()
      console.log(e)
      setmoveRate({ x: e.x, y: -e.y })
   }
   const handleStart = (e: any) => {
      setjoyStickMoving(true)
      console.log(e)
   }
   const handleStop = (e: any) => {
      if (e.type === 'stop') {
         console.log('stoppee')
         setjoyStickMoving(false)
      }
   }
   return (
      <span className='fixed left-0 bottom-0 flex items-center justify-center w-5/12 h-2/5'>
         <Joystick disabled={inactive} size={100} start={handleStart} sticky={false} baseColor='grey' stickColor="white" move={handleMove} stop={handleStop}></Joystick>
      </span>

   );
};

export default DPadController;
