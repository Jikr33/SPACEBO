import { url } from "inspector";
import React, { useEffect } from "react";
import audioPic from "../Assets/audio.png";
import mutePic from "../Assets/mute.png";

type Props = {
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
  sound: boolean;
};

export default function Settings({ setPaused, setSound, sound }: Props) {
  useEffect(() => {
    // console.log(sound, "sounding");
    handleSound(sound);
    localStorage.setItem("sound", sound.toString());
  }, [sound]);
  const handleSound = (sound: boolean) => {
    const soundElement = document.getElementById("soundButton");

    if (soundElement) {
      soundElement.style.backgroundImage = `url(${sound ? audioPic : mutePic})`;
    }
    // console.log(sound);
  };

  return (
    <div id="settings">
      <span onClick={() => setPaused(true)}></span>
      <span onClick={() => setSound((prev) => !prev)} id="soundButton"></span>
    </div>
  );
}
