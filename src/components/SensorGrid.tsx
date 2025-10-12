import React from 'react';
import { Users, Trophy, Fish, Radar, LucideIcon } from 'lucide-react';
import { Team } from '../hooks/useTeams';

const colorClasses = {
  cyan: {
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    bg: "bg-cyan-400"
  },
  green: {
    border: "border-green-500/30",
    text: "text-green-400",
    bg: "bg-green-400"
  },
  blue: {
    border: "border-blue-500/30",
    text: "text-blue-400",
    bg: "bg-blue-400"
  },
  orange: {
    border: "border-orange-500/30",
    text: "text-orange-400",
    bg: "bg-orange-400"
  },
  red: {
    border: "border-red-500/30",
    text: "text-red-400",
    bg: "bg-red-400"
  }
};

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: keyof typeof colorClasses;
  width: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ icon: Icon, label, value, color, width }) => {
  const classes = colorClasses[color] || colorClasses.cyan;
  return (
    <div className={`bg-black/70 backdrop-blur-md rounded border ${classes.border} p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <div className={`${classes.text} text-xs font-mono opacity-70`}>
            {label}
          </div>
          <div className="text-2xl font-mono text-white">{value}</div>
        </div>
        <Icon className={`w-6 h-6 ${classes.text}`} />
      </div>
      <div className="mt-2 h-1 bg-gray-800 rounded">
        <div
          className={`h-full ${classes.bg} rounded animate-pulse`}
          style={{ width }}
        />
      </div>
    </div>
  );
};

interface SensorGridProps {
  teams: Team[];
  fishCount: number;
}

const SensorGrid: React.FC<SensorGridProps> = ({ teams, fishCount }) => {

  const maxScore = teams.length > 0 ? Math.max(...teams.map((t) => t.score)) : 0;
  const totalTeams = parseInt(process.env.REACT_APP_HTF_TOTAL_TEAMS || "25", 10);
  const teamsActivePercent = totalTeams > 0 ? Math.min((teams.length / totalTeams) * 100, 100) : 0;

  // Deepest submarine dive: 10,927 meters (Trieste, Mariana Trench, 1960)
  const deepestPoint = 10927;
  const [currentDepth, setCurrentDepth] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDepth((prev) => {
        if (prev >= deepestPoint) return deepestPoint;
        return Math.min(prev + Math.floor(Math.random() * 30 + 10), deepestPoint);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const depthPercent = Math.round((currentDepth / deepestPoint) * 100);

  const dangerZonePercent = 90;
  const isDangerZone = depthPercent >= dangerZonePercent;
  const isMaxDepth = currentDepth >= deepestPoint;

  React.useEffect(() => {
    if (isMaxDepth) {
      const timeout = setTimeout(() => setCurrentDepth(0), 60000);
      return () => clearTimeout(timeout);
    }
  }, [isMaxDepth]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <SensorCard
        icon={Users}
        label="TEAMS ACTIVE"
        value={teams.length}
        color="cyan"
        width={`${teamsActivePercent}%`}
      />
      <SensorCard
        icon={Trophy}
        label="MAX SCORE"
        value={maxScore}
        color="green"
        width="92%"
      />
      <SensorCard
        icon={Fish}
        label="MARINE LIFE"
        value={fishCount ? fishCount : 120}
        color="blue"
        width="78%"
      />
      <SensorCard
        icon={Radar}
        label="DEPTH"
        value={`${currentDepth}M`}
        color={isDangerZone ? "red" : "orange"}
        width={`${depthPercent}%`}
      />
    </div>
  );
};

export default SensorGrid;
