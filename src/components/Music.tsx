import React, { lazy, useEffect, useState } from "react";

import music from "../Assets/music.mp3";
import cyber from "../Assets/cyber.mp3";
import flight from "../Assets/flight.mp3";

type Props = {};
async function delayedLoop(e: any): Promise<void> {
  const loopCount = 20; // Replace with the desired number of loop iterations

  for (let i = 0; i < loopCount; i++) {
    // Your code or logic inside the loop goes here
    console.log(`Iteration ${i + 1}`, e.volume);
    if (e.volume !== 0.5) {
      e.volume = (e.volume * 100 + 5) / 100;
    }

    // Add a delay of 5 seconds before proceeding to the next iteration
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
export default function Music({}: Props) {
  useEffect(() => {
    // Get the audio element
    let bg = [music, flight, cyber];

    // Generate a random index between 0 and 1 to choose one of the music options
    const randomIndex = Math.floor(Math.random() * bg.length);
    console.log(randomIndex);

    const audioElement = new Audio(bg[randomIndex]);

    // Set the loop attribute to make the audio loop continuously
    audioElement.loop = true;
    audioElement.volume = 0;

    // Play the audio
    audioElement.play();

    delayedLoop(audioElement);

    // Cleanup: Stop the audio and remove the event listener on unmount
    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);
  return null;
}
