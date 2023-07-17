import React, { useEffect, useRef, useState } from "react";
import { controllerProps } from "../types";
import { Joystick } from "react-joystick-component";
import { url } from "inspector";

const DPadController: React.FC<controllerProps> = ({
  inactive,
  setjoyStickMoving,
  setmoveRate,
  setPosition,
  position,
  joystickMoving,
  moveRate,
}) => {
  // const [moving, setmoving] = useState(false);
  // const [rate, setrate] = useState({ x: 0, y: 0 });

  // Function to handle joystick updates
  const handleMove = (e: any) => {
    // console.log(e);
    setmoveRate({ x: e.x, y: -e.y });
    // setrate({ x: e.x, y: -e.y });
  };
  const handleStop = (e: any) => {
    console.log("stopeed");
    setjoyStickMoving(false);
    setmoveRate({ x: 0, y: 0 });
    // setmoving(false);
    // setmoveRate({ x: 0, y: 0 });
  };

  // useEffect(() => {
  //   // let lastUpdateTimestamp = performance.now()
  //   if (moving) {
  //     const intervalId = setInterval(() => {
  //       // const newX = position.x + moveRate.x * 10;
  //       // const newY = position.y + moveRate.y * 10;
  //       // setPosition({ x: newX, y: newY });

  //       setPosition((prevPosition) => ({
  //         x: prevPosition.x + rate.x * 6,
  //         y: prevPosition.y + rate.y * 3,
  //       }));
  //       console.log("interval", rate);
  //     }, 20);

  //     console.log("moved", rate, moving);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }
  // }, [rate]);

  return (
    <span className="fixed left-0 bottom-0 flex items-center justify-center w-5/12 h-2/5">
      <Joystick
        disabled={inactive}
        size={100}
        sticky={false}
        baseColor="grey"
        stickColor="white"
        start={() => setjoyStickMoving(true)}
        // start={() => setmoving(true)}
        move={handleMove}
        stop={handleStop}></Joystick>
    </span>
  );
};

export default DPadController;
