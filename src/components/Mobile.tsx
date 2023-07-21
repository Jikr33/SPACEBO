import React, { useEffect, useState } from "react";
import DPadController from "./controller";
import { MobileProps } from "../types";

export default function Mobile({
  position,
  setPosition,
  play,
  shoot,
  heroSize,
}: MobileProps) {
  const [joystickMoving, setjoystickMoving] = useState(false);
  const [moveRate, setmoveRate] = useState({ x: 0, y: 0 });
  const [shooting, setShooting] = useState(false);

  useEffect(() => {
    // let lastUpdateTimestamp = performance.now()

    if (joystickMoving) {
      const intervalId = setInterval(() => {
        // const newX = position.x + moveRate.x * 10;
        // const newY = position.y + moveRate.y * 10;
        // setPosition({ x: newX, y: newY });

        setPosition((prevPosition) => {
          //   {
          //   x: prevPosition.x + moveRate.x * 2,
          //   y: prevPosition.y + moveRate.y * 1,

          // }
          // Calculate the new position
          const newX = prevPosition.x + moveRate.x * 2;
          const newY = prevPosition.y + moveRate.y * 1;

          // Check boundaries to ensure the hero stays within the window
          const boundedX = Math.max(
            0,
            Math.min(newX, window.innerWidth - heroSize.w)
          );
          const boundedY = Math.max(
            0,
            Math.min(newY, window.innerHeight - heroSize.h)
          );

          return { x: boundedX, y: boundedY };
        });
        console.log("intervad", moveRate);
      }, 1);

      // console.log("moved", moveRate);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [moveRate]);

  const handleShootStart = () => {
    setShooting(true);
  };
  const handleShootEnd = () => {
    setShooting(false);
  };
  useEffect(() => {
    let intervalId: any;

    if (shooting) {
      intervalId = setInterval(() => {
        shoot();
      }, 45);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [shooting, position]);
  return (
    <>
      <DPadController
        joystickMoving={joystickMoving}
        moveRate={moveRate}
        position={position}
        setPosition={setPosition}
        setjoyStickMoving={setjoystickMoving}
        setmoveRate={setmoveRate}
        play={!play}></DPadController>

      <span
        className="fixed right-16 bottom-10 h-24 w-24 z-10000000"
        id="fireButton"
        onTouchStart={handleShootStart}
        onTouchEnd={handleShootEnd}></span>

      <span
        id="ifPortraitMobile"
        className="hidden w-screen h-screen items-center justify-center fixed left-0 top-0 z-51 text-4xl text-ellipsis text-center">
        Утсаа хэвтээгээр нь тогло
      </span>
    </>
  );
}
