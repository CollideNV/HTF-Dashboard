import { useState, useEffect } from 'react';

export interface FishType {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: "shark" | "whale" | "tropical" | "normal";
  flipX: boolean;
  phase: number;
  depth: number;
  glowIntensity: number;
}

export interface BubbleType {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "large" | "normal";
}

const useMarineLife = () => {
  const [fish, setFish] = useState<FishType[]>([]);
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);

  useEffect(() => {
    const initialFish: FishType[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: 150 + Math.random() * (window.innerHeight - 200),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 1,
      size: 15 + Math.random() * 40,
      type:
        Math.random() > 0.85
          ? "shark"
          : Math.random() > 0.7
          ? "whale"
          : Math.random() > 0.5
          ? "tropical"
          : "normal",
      flipX: Math.random() > 0.5,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random(),
      glowIntensity: Math.random(),
    }));

    const initialBubbles: BubbleType[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.5 - Math.random() * 2.5,
      size: 3 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.4,
      type: Math.random() > 0.9 ? "large" : "normal",
    }));

    setFish(initialFish);
    setBubbles(initialBubbles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFish((prev) =>
        prev.map((f) => {
          let newX = f.x + f.vx;
          let newY = f.y + f.vy + Math.sin(f.phase + Date.now() * 0.001) * 1.2;
          let newVx = f.vx;
          let newVy = f.vy;
          let newFlipX = f.flipX;

          if (newX < -100) newX = window.innerWidth + 100;
          else if (newX > window.innerWidth + 100) newX = -100;

          if (newY < 120) {
            newY = 120;
            newVy = Math.abs(newVy) * 0.8;
          } else if (newY > window.innerHeight - 50) {
            newY = window.innerHeight - 50;
            newVy = -Math.abs(newVy) * 0.8;
          }

          if (Math.random() < 0.008) {
            newVx = (Math.random() - 0.5) * 3;
            newVy = (Math.random() - 0.5) * 1;
            newFlipX = newVx < 0;
          }

          if (f.type === "shark" && Math.random() < 0.005) {
            newVx *= 1.5;
            newVy *= 1.5;
          }

          return {
            ...f,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            flipX: newFlipX,
            phase: f.phase + 0.03,
            glowIntensity: 0.3 + Math.sin(Date.now() * 0.002 + f.id) * 0.3,
          };
        })
      );

      setBubbles((prev) =>
        prev.map((b) => {
          let newY = b.y + b.vy;
          let newX = b.x + b.vx + Math.sin(Date.now() * 0.0015 + b.id) * 0.5;

          if (newY < -50) {
            newY = window.innerHeight + Math.random() * 100;
            newX = Math.random() * window.innerWidth;
          }

          if (newX < -20) newX = window.innerWidth + 20;
          if (newX > window.innerWidth + 20) newX = -20;

          return { ...b, x: newX, y: newY };
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return { fish, bubbles };
};

export default useMarineLife;
