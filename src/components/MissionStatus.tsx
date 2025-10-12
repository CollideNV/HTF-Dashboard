import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Team from './Team';
import { Team as TeamType } from '../hooks/useTeams';

interface MissionStatusProps {
  teams: TeamType[];
  apiError: string | null;
  isCompactView: boolean;
  sliderIndex: number;
}

const MissionStatus: React.FC<MissionStatusProps> = ({ teams, apiError, isCompactView, sliderIndex }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-black/80 backdrop-blur-md rounded-lg border border-cyan-500/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-mono text-cyan-400">
          TEAM RECONNAISSANCE DATA
        </h2>
        <div className="flex items-center space-x-2 text-cyan-300 font-mono text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>LIVE TRACKING</span>
        </div>
      </div>

      {apiError ? (
        <div className="flex flex-col items-center justify-center h-96 text-red-400 font-mono">
          <AlertTriangle className="w-16 h-16 mb-4 animate-pulse" />
          <p className="text-xl text-center animate-pulse">{apiError}</p>
        </div>
      ) : isCompactView ? (
        <div className="space-y-2">
          {sortedTeams.map((team, index) => (
            <div
              key={team.id}
              className="grid grid-cols-[40px_1fr_120px] items-center p-2 rounded bg-cyan-500/5 border border-cyan-500/20"
            >
              <div className="text-lg font-mono text-cyan-300 text-center">
                {index + 1}
              </div>
              <div className="text-lg font-mono text-white">
                {team.name}
              </div>
              <div className="text-xl font-mono text-white text-right">
                {team.score.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(() => {
            const topTeams = sortedTeams.slice(0, 3);
            const sliderTeams = sortedTeams.slice(3);
            const teamsToRender = [...topTeams];

            if (sliderTeams.length > 0) {
              const evenIndex = sliderIndex * 2;
              const oddIndex = sliderIndex * 2 + 1;

              if (sliderTeams[oddIndex]) {
                teamsToRender.push(sliderTeams[evenIndex]);
                teamsToRender.push(sliderTeams[oddIndex]);
              } else if (sliderTeams[evenIndex]) {
                if (sliderTeams.length > 1) {
                  teamsToRender.push(sliderTeams[evenIndex - 1]);
                  teamsToRender.push(sliderTeams[evenIndex]);
                } else {
                  teamsToRender.push(sliderTeams[evenIndex]);
                }
              }
            }

            return teamsToRender.map((team, index) => {
              const isSliderItem = index >= 3 && sliderTeams.length > 0;

              let rank;
              if (isSliderItem) {
                const evenIndex = sliderIndex * 2;
                const oddIndex = sliderIndex * 2 + 1;
                const isLastPageSingle = !sliderTeams[oddIndex];

                if (isLastPageSingle && sliderTeams.length > 1) {
                  if (index === 3) {
                    rank = 3 + evenIndex; 
                  } else { 
                    rank = 3 + evenIndex + 1; 
                  }
                } else {
                  if (index === 3) {
                    rank = 3 + evenIndex + 1;
                  } else { 
                    rank = 3 + oddIndex + 1;
                  }
                }
              } else {
                rank = index + 1;
              }

              return (
                <Team key={team.id} team={team} rank={rank} isSliderItem={isSliderItem} maxScore={sortedTeams[0]?.score || 1} />
              );
            });
          })()}
        </div>
      )}
    </div>
  );
};

export default MissionStatus;
