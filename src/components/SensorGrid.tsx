import React from "react";
import {
  Fish,
  LucideIcon,
  Compass,
  Droplets,
  Heart,
  Radio,
  Anchor,
  Zap,
  Gauge as Activity,
  Bot,
} from "lucide-react";
import { Team } from "../hooks/useTeams";

interface Aggregate {
  totalTeams: number;
  activeQuests: number;
  globalEffects: AppliedEffect[];
}

interface AppliedEffect {
  effectType: string;
  totalValue: number;
}

interface EffectConfig {
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
  animationClass: string;
  displayName: string;
}

const getEffectConfig = (effectType: string): EffectConfig => {
  const configs: Record<string, EffectConfig> = {
    WATER_QUALITY: {
      icon: Droplets,
      textColor: "text-cyan-300",
      bgColor: "bg-cyan-500/20",
      animationClass: "animate-drop-fall",
      displayName: "CURRENTS FLOW",
    },
    NAVIGATION: {
      icon: Compass,
      textColor: "text-green-300",
      bgColor: "bg-green-500/20",
      animationClass: "animate-spin-compass",
      displayName: "SONAR COMPASS",
    },
    STRUCTURAL_INTEGRITY: {
      icon: Anchor,
      textColor: "text-orange-300",
      bgColor: "bg-orange-500/20",
      animationClass: "animate-bounce-anchor",
      displayName: "HULL STRENGTH",
    },
    MARINE_LIFE: {
      icon: Heart,
      textColor: "text-rose-300",
      bgColor: "bg-rose-500/20",
      animationClass: "animate-pulse-heart",
      displayName: "BIOLUMINESCENCE",
    },
    ENERGY: {
      icon: Zap,
      textColor: "text-yellow-300",
      bgColor: "bg-yellow-500/20",
      animationClass: "animate-flash-lightning",
      displayName: "POWER CORE",
    },
    DEPTH: {
      icon: Activity,
      textColor: "text-blue-300",
      bgColor: "bg-blue-500/20",
      animationClass: "animate-cleanup",
      displayName: "DEPTH GAUGE",
    },
    COMMUNICATION: {
      icon: Radio,
      textColor: "text-purple-300",
      bgColor: "bg-purple-500/20",
      animationClass: "animate-ping-signal",
      displayName: "DEEP ECHO",
    },
    POLLUTION_CONTROL: {
      icon: Bot,
      textColor: "text-indigo-300",
      bgColor: "bg-indigo-500/20",
      animationClass: "animate-cleanup",
      displayName: "CLEANER BOTS",
    },
  };

  return (
    configs[effectType] || {
      icon: Fish,
      textColor: "text-gray-300",
      bgColor: "bg-gray-500/20",
      animationClass: "",
      displayName: effectType,
    }
  );
};

interface EffectCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  textColor: string;
  bgColor: string;
  animationClass: string;
}

const EffectCard: React.FC<EffectCardProps> = ({
  icon: Icon,
  label,
  value,
  textColor,
  bgColor,
  animationClass,
}) => {
  return (
    <div
      className={`${bgColor} backdrop-blur-md rounded border border-white/10 p-4 relative overflow-hidden group`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white/5 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className={`${textColor} text-xs font-mono opacity-70 mb-2`}>
          {label}
        </div>
        <div className="flex items-center justify-between">
          <div className={`text-2xl font-mono text-white`}>{value}</div>
          <Icon className={`w-6 h-6 ${textColor} ${animationClass}`} />
        </div>
      </div>
    </div>
  );
};

interface SensorGridProps {
  teams: Team[];
  fishCount: number;
  aggregate: Aggregate | null;
}

const SensorGrid: React.FC<SensorGridProps> = ({ aggregate }) => {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  // Auto-refresh data every 5 minutes
  React.useEffect(() => {
    const refreshInterval = setInterval(() => {
      console.log("[SensorGrid] Triggering refresh of aggregate data...");
      setRefreshTrigger((prev) => prev + 1);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  React.useEffect(() => {
    if (aggregate) {
      console.log("[SensorGrid] Aggregate data updated:", aggregate);
      console.log("[SensorGrid] Global effects:", aggregate.globalEffects);
    }
  }, [aggregate, refreshTrigger]);

  // Define all possible effect types that should always be displayed
  const allEffectTypes = [
    "WATER_QUALITY",
    "NAVIGATION",
    "STRUCTURAL_INTEGRITY",
    "MARINE_LIFE",
    "ENERGY",
    "DEPTH",
    "COMMUNICATION",
    "POLLUTION_CONTROL",
  ];

  // Create a memoized map of effect values from aggregate data
  const effectValues = React.useMemo(() => {
    const map = new Map<string, number>();
    if (aggregate?.globalEffects) {
      aggregate.globalEffects.forEach((effect) => {
        map.set(effect.effectType, effect.totalValue);
      });
    }
    return map;
  }, [aggregate?.globalEffects]);

  return (
    <>
      <div className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
          {allEffectTypes.map((effectType) => {
            const config = getEffectConfig(effectType);
            const value = effectValues.get(effectType) || 0;
            return (
              <EffectCard
                key={`effect-${effectType}`}
                icon={config.icon}
                label={config.displayName}
                value={value}
                textColor={config.textColor}
                bgColor={config.bgColor}
                animationClass={config.animationClass}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SensorGrid;
