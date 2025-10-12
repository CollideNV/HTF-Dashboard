import { useState, useEffect } from 'react';
import { Team } from './useTeams';

const useUI = (teams: Team[]) => {
  const [sonarPing, setSonarPing] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showBriefing, setShowBriefing] = useState(false);
  const [isCompactView, setIsCompactView] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSonarPing((prev) => (prev + 1) % 360);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    const sliderTeams = sortedTeams.slice(3);

    if (sliderTeams.length > 1) {
      const numPages = sliderTeams.length > 0 ? Math.ceil(sliderTeams.length / 2) : 0;
      if (numPages > 1) {
        const interval = setInterval(() => {
          setSliderIndex((prevIndex) => (prevIndex + 1) % numPages);
        }, 5000); // 5 seconds
        return () => clearInterval(interval);
      }
    }
  }, [teams]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return {
    sonarPing,
    sliderIndex,
    showBriefing,
    setShowBriefing,
    isCompactView,
    setIsCompactView,
    toggleFullScreen,
  };
};

export default useUI;
