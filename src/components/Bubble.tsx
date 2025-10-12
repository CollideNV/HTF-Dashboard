import React from 'react';

interface BubbleType {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "large" | "normal";
}

interface BubbleProps {
  bubble: BubbleType;
}

const Bubble: React.FC<BubbleProps> = ({ bubble }) => (
  <div
    className="absolute rounded-full animate-pulse"
    style={{
      left: bubble.x,
      top: bubble.y,
      width: bubble.size,
      height: bubble.size,
      opacity: bubble.opacity,
      background:
        bubble.type === "large"
          ? "radial-gradient(circle at 30% 30%, rgba(0,255,255,0.6), rgba(255,255,255,0.1))"
          : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,255,255,0.05))",
      boxShadow: `0 0 ${bubble.size * 0.5}px rgba(0,255,255,0.3)`,
      zIndex: 5,
      border: "1px solid rgba(0,255,255,0.2)",
    }}
  />
);

export default Bubble;
