import { throttle } from "lodash";
import React, { useEffect, useState } from "react";
import { DesktopProps } from "../types";

export default function Desktop({
  position,
  setPosition,
  speed,
  shoot,
  heroSize,
  setPlay,
  play,
  ended,
  setEnded,
}: DesktopProps) {
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    " ": false,
  });
  const throttledEffect = throttle(() => {
    let updatedPosition = { ...position };

    // console.log("runing");
    if (keys.w) {
      updatedPosition.y = Math.max(position.y - speed, 0);
    }
    if (keys.a) {
      updatedPosition.x = Math.max(position.x - speed, 0);
    }

    if (keys.s) {
      updatedPosition.y = Math.min(
        position.y + speed,
        window.innerHeight - heroSize.h
      );
    }

    if (keys.d) {
      updatedPosition.x = Math.min(
        position.x + speed,
        window.innerWidth - heroSize.w
      );
    }
    if (keys[" "]) {
      shoot();
    }
    // Update position for other keys...

    setPosition(updatedPosition);
  }, 5);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys) {
        setKeys((prev) => ({ ...prev, [e.key]: true }));
      }
      if (e.key == "Escape") {
        setEnded((prev) => !prev);
        setPlay((prev) => !prev);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keys) {
        setKeys((prev) => ({ ...prev, [e.key]: false }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // starts game and removes play button.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      switch (key) {
        case "Enter":
          setPlay(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [play]);

  const [prevKeys, setPrevKeys] = useState(keys);
  useEffect(() => {
    setPrevKeys(keys);
    console.log("keys", keys);
    throttledEffect();
  }, [keys]);
  return <></>;
}
