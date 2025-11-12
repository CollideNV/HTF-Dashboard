import React, { useState, useEffect } from "react";
import { AlertTriangle, Zap, Radio } from "lucide-react";

interface PrankOverlayProps {
  isActive: boolean;
}

const PrankOverlay: React.FC<PrankOverlayProps> = ({ isActive }) => {
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const glitchInterval = setInterval(() => {
      setGlitchIntensity(Math.random() * 100);
    }, 300);

    return () => {
      clearInterval(glitchInterval);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-black/80 backdrop-blur-sm">
      {/* Scanlines effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 2px)",
          backgroundSize: "100% 2px",
          animation: "scanlines 8s linear infinite",
        }}
      />

      {/* Glitch layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(255,0,0,0.1) 50%, transparent 70%)`,
          animation: "glitch 2s infinite",
          transform: `translateX(${glitchIntensity % 10}px)`,
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Pulsing header */}
        <div className="text-center mb-8 animate-pulse">
          <div className="flex items-center justify-center mb-4 gap-4">
            <Radio className="w-16 h-16 text-red-500 animate-spin" />
            <AlertTriangle className="w-20 h-20 text-red-600 animate-bounce" />
            <Radio className="w-16 h-16 text-red-500 animate-spin" style={{ animationDirection: "reverse" }} />
          </div>

          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 font-mono mb-4 animate-pulse" style={{ textShadow: "0 0 20px rgba(255,0,0,0.8)" }}>
            SYSTEM CRITICAL ERROR
          </h1>

          <div className="text-2xl font-bold text-red-400 font-mono mb-2 animate-pulse">
            ⚠️ SUBMARINE SYSTEMS COMPROMISED ⚠️
          </div>

          {/* Error details */}
          <div className="bg-black/60 border-2 border-red-500 rounded-lg p-8 max-w-2xl mx-auto my-8 font-mono text-sm">
            <div className="text-red-400 text-left space-y-3">
              <div>
                <span className="text-red-500">{">"} ERROR CODE:</span> <span className="text-red-300 animate-pulse">0xDEADBEEF</span>
              </div>
              <div>
                <span className="text-red-500">{">"} SUBSYSTEM:</span> <span className="text-red-300">AQUATIC NAVIGATION & VOTING PROTOCOL</span>
              </div>
              <div>
                <span className="text-red-500">{">"} SEVERITY:</span> <span className="text-red-300 font-bold animate-pulse">CRITICAL</span>
              </div>
              <div>
                <span className="text-red-500">{">"} STATUS:</span> <span className="text-red-300">ALL SYSTEMS OFFLINE</span>
              </div>
              <div className="border-t border-red-500 pt-3 mt-3">
                <span className="text-yellow-400">MESSAGE:</span>
                <div className="text-yellow-300 mt-2 leading-relaxed">
                  Dolphins have hacked the voting system. Mission abort. Retreat to surface immediately. All underwater operations suspended until further notice.
                </div>
              </div>
            </div>
          </div>

          {/* Blinking text */}
          <div className="text-xl text-red-500 font-mono font-bold mb-4 animate-pulse">
            🐬 DOLPHIN TAKEOVER IN PROGRESS 🐬
          </div>

          {/* Fake restart button */}
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-mono font-bold text-lg rounded-lg border-2 border-red-500 hover:border-red-300 transition-all hover:shadow-lg hover:shadow-red-500/50 cursor-pointer mt-4 animate-pulse"
          >
            <Zap className="w-5 h-5 inline mr-2" />
            ATTEMPT SYSTEM REBOOT
          </button>

          {/* Scrolling text */}
          <div className="text-xs text-cyan-400 font-mono mt-8 text-center opacity-70">
            <div className="animate-pulse">
              ▓▒░ Transmitting distress signal... ░▒▓
            </div>
            <div className="mt-2 text-red-500 animate-bounce">
              [DOLPHINS_SENDING_SONIC_WAVES.wav]
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 border-t-2 border-red-500 p-3 font-mono text-xs text-cyan-400">
        <div className="flex justify-between">
          <span className="animate-pulse">⚠️ CRITICAL SYSTEM FAILURE</span>
          <span>STATUS: DOLPHIN CONTROL ENGAGED</span>
          <span className="text-red-500 animate-pulse">🔴 OFFLINE</span>
        </div>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
};

export default PrankOverlay;
