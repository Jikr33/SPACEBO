import React, { useEffect, useRef } from "react";
import { StarField, useStarField } from "starfield-react";

// interface Star {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
// }
type Props = {};
export default function Stars({}: Props) {
  //   const canvasRef = useRef<HTMLCanvasElement>(null);
  //   const w = window.innerWidth;
  //   const h = window.innerHeight;

  //   useEffect(() => {
  //     const canvas = canvasRef.current!;
  //     const context = canvas.getContext("2d")!;

  //     function createStar() {
  //       const star: Star = {
  //         x: Math.random() * w,
  //         y: Math.random() * h,
  //         vx: Math.random() * 2 - 1,
  //         vy: Math.random() * 2 - 1,
  //       };
  //       return star;
  //     }

  //     function animate() {
  //       context.clearRect(0, 0, w, h);

  //       for (let i = 0; i < 500; i++) {
  //         const star = createStar();
  //         context.beginPath();
  //         context.arc(star.x, star.y, 1, 0, 2 * Math.PI);
  //         context.fillStyle = "white";
  //         context.fill();
  //         star.x += star.vx;
  //         star.y += star.vy;
  //       }

  //       requestAnimationFrame(animate);
  //     }

  //     animate();
  //   }, []);
  return <canvas id="stars"></canvas>;
}
