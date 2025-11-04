import React from 'react';
import {
  Users,
  Radar,
  AlertTriangle,
  Fish,
  CheckCircle,
  XCircle,
  ListTodo,
  LucideIcon,
  Droplets,
  Compass,
  Anchor,
  Heart,
  Zap as Lightning,
  Gauge as DepthGauge,
  Radio as Signal,
  Bot as Trash,
} from 'lucide-react';
import { Team as TeamType } from '../hooks/useTeams';

interface BadgeIconProps {
  badgeUrl: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ badgeUrl }) => {
  const Icon: LucideIcon =
    ({
      AQUA_INFRA_BADGE: Users,
      DATA_VIS_BADGE: Radar,
      POLLUTION_CONTROL_BADGE: AlertTriangle,
    }[badgeUrl] as LucideIcon) || Fish;
  return <Icon className="w-4 h-4" />;
};

interface EffectConfig {
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
  animationClass: string;
}

const getEffectConfig = (effectType: string): EffectConfig => {
  const configs: Record<string, EffectConfig> = {
    WATER_QUALITY: {
      icon: Droplets,
      textColor: 'text-cyan-300',
      bgColor: 'bg-cyan-500/20',
      animationClass: 'animate-drop-fall',
    },
    NAVIGATION: {
      icon: Compass,
      textColor: 'text-green-300',
      bgColor: 'bg-green-500/20',
      animationClass: 'animate-spin-compass',
    },
    STRUCTURAL_INTEGRITY: {
      icon: Anchor,
      textColor: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      animationClass: 'animate-bounce-anchor',
    },
    MARINE_LIFE: {
      icon: Heart,
      textColor: 'text-rose-300',
      bgColor: 'bg-rose-500/20',
      animationClass: 'animate-pulse-heart',
    },
    ENERGY: {
      icon: Lightning,
      textColor: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20',
      animationClass: 'animate-flash-lightning',
    },
    DEPTH: {
      icon: DepthGauge,
      textColor: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      animationClass: 'animate-rise-depth',
    },
    COMMUNICATION: {
      icon: Signal,
      textColor: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      animationClass: 'animate-ping-signal',
    },
    POLLUTION_CONTROL: {
      icon: Trash,
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-400/20',
      animationClass: 'animate-cleanup',
    },
  };

  return configs[effectType] || {
    icon: Fish,
    textColor: 'text-gray-300',
    bgColor: 'bg-gray-500/20',
    animationClass: '',
  };
};


interface TeamProps {
  team: TeamType;
  rank: number;
  isSliderItem: boolean;
  maxScore: number;
}

const Team: React.FC<TeamProps> = ({ team, rank, isSliderItem, maxScore }) => {
  const missionsLeft = team.problems?.flatMap(p => p.mission).filter(m => !m.solved).length;

  return (
    <div
      className={`p-4 rounded border backdrop-blur-sm transition-all duration-300 ${
        rank === 1
          ? "border-yellow-400/50 bg-yellow-400/10"
          : rank === 2
          ? "border-gray-300/50 bg-gray-300/10"
          : rank === 3
          ? "border-orange-400/50 bg-orange-400/10"
          : "border-cyan-500/30 bg-cyan-500/5"
      } ${
        isSliderItem
          ? "border-dashed border-cyan-500/50 animate-pulse"
          : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`w-8 h-8 rounded border-2 flex items-center justify-center font-mono font-bold ${
              rank === 1
                ? "border-yellow-400 text-yellow-400 bg-yellow-400/20"
                : rank === 2
                ? "border-gray-300 text-gray-300 bg-gray-300/20"
                : rank === 3
                ? "border-orange-400 text-orange-400 bg-orange-400/20"
                : "border-cyan-400 text-cyan-400 bg-cyan-400/20"
            }`}
          >
            {rank}
          </div>

          <div>
            <h3 className="text-lg font-mono text-white">
              {team.name}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs text-gray-400 font-mono flex items-center">
                <ListTodo className="w-3 h-3 mr-1" />
                {missionsLeft}{" "}
                {missionsLeft === 1 ? "MISSION" : "MISSIONS"}{" "}
                LEFT</span>
              <div className="h-4 border-l border-gray-500/30"></div>
              {team.appliedEffects && team.appliedEffects.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400 font-mono">APPLIED EFFECTS:</span>
                  <div className="flex items-center space-x-1">
                    {team.appliedEffects.map((effect, effectIndex) => {
                      const config = getEffectConfig(effect.effectType);
                      const EffectIcon = config.icon;
                      return (
                        <span
                          key={`${team.id}-${effect.effectType}-${effectIndex}`}
                          className={`text-xs font-mono flex items-center ${config.textColor} ${config.bgColor} px-2 py-0.5 rounded`}
                          title={effect.effectType}
                        >
                          <EffectIcon className={`w-3 h-3 mr-1.5 ${config.animationClass}`} />
                          {effect.totalValue}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {team.problems?.map((p: any, problemIndex: number) => (
              <div
                key={`${team.id}-${p.name}-${problemIndex}`}
                className={`flex items-center space-x-1.5 p-1.5 rounded border ${
                  p.solved
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
                title={`${p.name}: ${
                  p.solved ? "Solved" : "Unsolved"
                }`}
              >
                <BadgeIcon badgeUrl={p.badgeUrl} />
                {p.solved ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
              </div>
            ))}
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-white">
              {team.score.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              MISSION PTS
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-gray-900 rounded-full h-1 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            rank === 1
              ? "bg-yellow-400"
              : rank === 2
              ? "bg-gray-300"
              : rank === 3
              ? "bg-orange-400"
              : "bg-cyan-400"
          }`}
          style={{
            width: `${(team.score / maxScore) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Team;
