import React from 'react';

interface FishType {
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

interface FishProps {
  fish: FishType;
}

const Fish: React.FC<FishProps> = ({ fish }) => {
  const getFishStyle = (): React.CSSProperties => {
    const baseOpacity = 0.6 + fish.depth * 0.4;
    const glowColor =
      fish.type === "shark"
        ? "#ff4444"
        : fish.type === "whale"
        ? "#4444ff"
        : fish.type === "tropical"
        ? "#ffaa00"
        : "#00aaff";

    switch (fish.type) {
      case "shark":
        return {
          width: fish.size * 1.8,
          height: fish.size * 0.9,
          background: `linear-gradient(45deg, #1a1a2e, #16213e, #0f3460)`,
          boxShadow: `0 0 ${
            fish.size * fish.glowIntensity
          }px ${glowColor}80, inset 0 2px 4px rgba(255,255,255,0.1)`,
          opacity: baseOpacity,
          border: "1px solid rgba(255,68,68,0.3)",
        };
      case "whale":
        return {
          width: fish.size * 2.2,
          height: fish.size * 1.1,
          background: `linear-gradient(45deg, #0f1419, #1a2332, #2d4356)`,
          boxShadow: `0 0 ${
            fish.size * fish.glowIntensity * 1.5
          }px ${glowColor}60`,
          opacity: baseOpacity,
          border: "1px solid rgba(68,68,255,0.3)",
        };
      case "tropical":
        return {
          width: fish.size,
          height: fish.size * 0.7,
          background: `linear-gradient(45deg, #ff6b00, #ffa500, #ffdd00)`,
          boxShadow: `0 0 ${fish.size * fish.glowIntensity}px ${glowColor}70`,
          opacity: baseOpacity + 0.2,
          border: "1px solid rgba(255,170,0,0.4)",
        };
      default:
        return {
          width: fish.size,
          height: fish.size * 0.6,
          background: `linear-gradient(45deg, #0066cc, #0088ff, #00aaff)`,
          boxShadow: `0 0 ${fish.size * fish.glowIntensity}px ${glowColor}50`,
          opacity: baseOpacity,
          border: "1px solid rgba(0,170,255,0.3)",
        };
    }
  };

  return (
    <div
      className={`absolute transition-all duration-200 ${
        fish.flipX ? "scale-x-[-1]" : ""
      }`}
      style={{
        left: fish.x,
        top: fish.y,
        transform: `translate(-50%, -50%) ${fish.flipX ? "scaleX(-1)" : ""}`,
        zIndex: fish.type === "whale" ? 25 : fish.type === "shark" ? 20 : 15,
      }}
    >
      <div className="rounded-full backdrop-blur-sm" style={getFishStyle()} />
      {/* Tail fin */}
      <div
        className="absolute top-1/2 right-0 w-0 h-0 opacity-80"
        style={{
          borderTop: `${fish.size * 0.2}px solid transparent`,
          borderBottom: `${fish.size * 0.2}px solid transparent`,
          borderLeft: `${fish.size * 0.3}px solid ${
            fish.type === "shark"
              ? "#1a1a2e"
              : fish.type === "whale"
              ? "#1a2332"
              : fish.type === "tropical"
              ? "#ff6b00"
              : "#0066cc"
          }`,
          transform: "translateY(-50%)",
          filter: `drop-shadow(0 0 5px ${
            fish.type === "shark" ? "#ff4444" : "#00aaff"
          }50)`,
        }}
      />
      {/* Eye for larger fish */}
      {fish.size > 25 && (
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: fish.size * 0.12,
            height: fish.size * 0.12,
            left: fish.size * 0.3,
            top: fish.size * 0.25,
            boxShadow: "0 0 3px rgba(255,255,255,0.8)",
          }}
        />
      )}
    </div>
  );
};

export default Fish;
