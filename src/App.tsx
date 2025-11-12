import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import useTime from "./hooks/useTime";
import useMarineLife from "./hooks/useMarineLife";
import useTeams from "./hooks/useTeams";
import useUI from "./hooks/useUI";
import Fish from "./components/Fish";
import Bubble from "./components/Bubble";
import Header from "./components/Header";
import BriefingPanel from "./components/BriefingPanel";
import SensorGrid from "./components/SensorGrid";
import MissionStatus from "./components/MissionStatus";
import ProtectedBackoffice from "./components/ProtectedBackoffice";
import Vote from "./components/Vote";
import PrankOverlay from "./components/PrankOverlay";

const Dashboard = () => {
  const { time, timeLeft, formatTimeLeft } = useTime();
  const { teams, aggregate, apiError, isLoading } = useTeams();
  const { fish, bubbles } = useMarineLife();
  const {
    sonarPing,
    sliderIndex,
    showBriefing,
    setShowBriefing,
    isCompactView,
    setIsCompactView,
    toggleFullScreen,
  } = useUI(teams);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showPrankOverlay, setShowPrankOverlay] = useState(false);

  // Trigger prank with keyboard shortcut (Ctrl+P)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setShowPrankOverlay(!showPrankOverlay);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showPrankOverlay]);

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-cyan-400 text-2xl font-mono animate-pulse">
          Establishing uplink to command server...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full border-2 border-cyan-500/30 pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) rotate(${sonarPing}deg)`,
          background: `conic-gradient(from ${sonarPing}deg, transparent, rgba(0,255,255,0.1), transparent)`,
        }}
      >
        <div className="absolute top-0 left-1/2 w-0.5 h-48 bg-cyan-400/60 transform -translate-x-0.5" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} bubble={bubble} />
      ))}

      {fish.map((f) => (
        <Fish key={f.id} fish={f} />
      ))}

      {showBriefing && (
        <BriefingPanel onHideBriefing={() => setShowBriefing(false)} />
      )}

      <div className="relative z-30 p-6">
        <Header
          isCompactView={isCompactView}
          onToggleCompactView={() => setIsCompactView(!isCompactView)}
          onShowBriefing={() => setShowBriefing(true)}
          onOpenVote={() => setShowVoteModal(true)}
          time={time}
          onToggleFullScreen={toggleFullScreen}
          timeLeft={timeLeft}
          formatTimeLeft={formatTimeLeft}
        />

        {!isCompactView && <SensorGrid teams={teams} fishCount={fish.length} aggregate={aggregate} />}

        <MissionStatus
          teams={teams}
          apiError={apiError}
          isCompactView={isCompactView}
          sliderIndex={sliderIndex}
        />
      </div>

      <Vote isOpen={showVoteModal} onClose={() => setShowVoteModal(false)} />
      <PrankOverlay isActive={showPrankOverlay} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/backoffice" element={<ProtectedBackoffice />} />
      </Routes>
    </Router>
  );
};

export default App;
