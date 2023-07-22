import React, { useEffect, useRef, useState } from "react";
import DPadController from "./controller";
import { MobileProps } from "../types";
import { throttle } from "lodash";

export default function Mobile({
  position,
  setPosition,
  play,
  shoot,
  heroSize,
  shooting,
  setShooting,
}: MobileProps) {
  const [joystickMoving, setjoystickMoving] = useState(false);
  const [moveRate, setmoveRate] = useState({ x: 0, y: 0 });
  // const [shooting, setShooting] = useState(false);

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
    // console.log("set flase");
  };
  useEffect(() => {
    let rafId: number;
    let lastUpdateTimestamp = performance.now();

    const updateBullets = (timestamp: number) => {
      if (shooting) {
        rafId = requestAnimationFrame(updateBullets);
        const deltaTime = timestamp - lastUpdateTimestamp;
        lastUpdateTimestamp = timestamp;

        if (deltaTime >= 10) {
          shoot();
        }
      }
    };
    rafId = requestAnimationFrame(updateBullets);
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [shooting]);
  //////////////

  ////////////////

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
  //     updatedPosition.y = Math.max(position.y - 4, 0);
  //   }
  //   if (keys.a) {
  //     updatedPosition.x = Math.max(position.x - 4, 0);
  //   }

  //   if (keys.s) {
  //     updatedPosition.y = Math.min(
  //       position.y + 4,
  //       window.innerHeight - heroSize.h
  //     );
  //   }

  //   if (keys.d) {
  //     updatedPosition.x = Math.min(
  //       position.x + 4,
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
  //   // console.log("keys", keys);
  //   throttledEffect();
  // }, [keys]);
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
        className="fixed right-16 bottom-10 h-24 w-24"
        id="fireButton"
        onTouchStart={handleShootStart}
        onTouchEnd={handleShootEnd}></span>

      <span
        id="ifPortraitMobile"
        className="landscape:hidden portrait:flex w-screen h-screen items-center justify-center fixed left-0 top-0 z-51 text-4xl text-ellipsis text-center">
        Утсаа хэвтээгээр нь тогло
      </span>
    </>
  );
}
