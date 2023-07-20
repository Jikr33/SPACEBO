import React, { useState } from "react";
import p from "../Assets/bubbles-rise-43293_npagtkYV.mp3";
import ReactPlayer from "react-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Howl } from "howler";

type Props = {};

export default function Music({}: Props) {
  // const [sound] = useState<Howl>(
  //   new Howl({ src: ["../Assets/music.mp3"], html5: true })
  // );
  // const playSound = () => {
  //   sound.play();
  // };
  return (
    // <button className="z-30" onClick={() => playSound}>
    //   Music
    // </button>
    // <ReactPlayer
    //   url={
    //     "https://www.youtube.com/watch?v=W2MpGCL8-9o&list=RDW2MpGCL8-9o&start_radio=1"
    //   }
    //   playing={true}
    //   volume={1}></ReactPlayer>

    <AudioPlayer
      autoPlay
      src="../Assets/music.mp3"
      onPlay={(e) => console.log("onPlay")}
      // other props here
    />
  );
}
