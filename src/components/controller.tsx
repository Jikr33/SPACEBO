import React, { useEffect, useRef, useState } from "react";
import { controllerProps } from "../types";
import { Joystick } from "react-joystick-component";
import { url } from "inspector";

const DPadController: React.FC<controllerProps> = ({
  play,
  setjoyStickMoving,
  setmoveRate,
  setPosition,
  position,
  joystickMoving,
  moveRate,
}) => {
  // Function to handle joystick updates
  const handleMove = (e: any) => {
    setmoveRate({ x: e.x, y: -e.y });
  };
  const handleStop = (e: any) => {
    console.log("stopeed");
    setjoyStickMoving(false);
    setmoveRate({ x: 0, y: 0 });
  };

  return (
    <span
      id="joyStick"
      className="fixed left-0 bottom-0 flex items-center justify-center w-2/6 h-2/5">
      <Joystick
        disabled={play}
        size={100}
        sticky={false}
        baseColor="#77777769"
        stickColor="#ffffff9e"
        start={() => setjoyStickMoving(true)}
        // start={() => setmoving(true)}
        move={handleMove}
        stop={handleStop}></Joystick>
    </span>
  );
};

export default DPadController;
