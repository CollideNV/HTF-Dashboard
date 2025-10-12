import React from "react";
import { BookOpen, ListTodo, AlertTriangle } from "lucide-react";
import logo from "../assets/images/logo.png";

interface HeaderProps {
  isCompactView: boolean;
  onToggleCompactView: () => void;
  onShowBriefing: () => void;
  time: Date;
  onToggleFullScreen: () => void;
  timeLeft: number;
  formatTimeLeft: (ms: number) => string;
}

const Header: React.FC<HeaderProps> = ({
  isCompactView,
  onToggleCompactView,
  onShowBriefing,
  time,
  onToggleFullScreen,
  timeLeft,
  formatTimeLeft,
}) => {
  return (
    <div
      className="flex justify-between items-center mb-8 bg-black/60 backdrop-blur-md rounded-lg border border-cyan-500/30 p-4"
      onDoubleClick={onToggleFullScreen}
    >
      <div className="flex items-center space-x-6">
        {!isCompactView && (
          <>
            <img src={logo} alt="Aquatech Mission Logo" className="h-12" />
            <div className="text-cyan-400 font-mono">
              <div className="text-xs opacity-70">SUBMARINE OS v3.21</div>
              <div className="text-lg font-bold">AQUATECH MISSION 250</div>
            </div>
            <div className="w-px h-12 bg-cyan-500/30" />
            <div className="text-cyan-300 font-mono">
              <div className="text-xs opacity-70">SYSTEM TIME</div>
              <div className="text-sm">{time.toLocaleTimeString()}</div>
            </div>
            <div className="w-px h-12 bg-cyan-500/30" />
          </>
        )}
        <button
          onClick={onShowBriefing}
          className="flex items-center space-x-2 text-cyan-300 font-mono hover:text-white hover:bg-cyan-500/20 px-3 py-2 rounded-lg transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-sm">MISSION BRIEFING</span>
        </button>
        <button
          onClick={onToggleCompactView}
          className="flex items-center space-x-2 text-cyan-300 font-mono hover:text-white hover:bg-cyan-500/20 px-3 py-2 rounded-lg transition-colors"
        >
          <ListTodo className="w-5 h-5" />
          <span className="text-sm">
            {isCompactView ? "SHOW DASHBOARD" : "COMPACT VIEW"}
          </span>
        </button>
      </div>

      {/* Deadline Alert */}
      {!isCompactView && (
        <div
          className={`flex items-center space-x-2 px-4 py-2 rounded border font-mono ${
            timeLeft < 2 * 60 * 60 * 1000
              ? "border-red-500 bg-red-500/20 text-red-300"
              : timeLeft < 4 * 60 * 60 * 1000
              ? "border-yellow-500 bg-yellow-500/20 text-yellow-300"
              : "border-green-500 bg-green-500/20 text-green-300"
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
          <div>
            <div className="text-xs opacity-70">MISSION DEADLINE</div>
            <div
              className={`text-xl font-bold ${
                timeLeft > 0 && timeLeft < 60 * 1000 ? "animate-blink" : ""
              }`}
            >
              {timeLeft < 0 ? "DEADLINE PASSED" : formatTimeLeft(timeLeft)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
