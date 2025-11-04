import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: keyof typeof colorClasses;
  width: string;
}

const colorClasses = {
  cyan: {
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    bg: "bg-cyan-400",
  },
  green: {
    border: "border-green-500/30",
    text: "text-green-400",
    bg: "bg-green-400",
  },
  blue: {
    border: "border-blue-500/30",
    text: "text-blue-400",
    bg: "bg-blue-400",
  },
  orange: {
    border: "border-orange-500/30",
    text: "text-orange-400",
    bg: "bg-orange-400",
  },
  red: {
    border: "border-red-500/30",
    text: "text-red-400",
    bg: "bg-red-400",
  },
};

const SensorCard: React.FC<SensorCardProps> = ({
  icon: Icon,
  label,
  value,
  color,
  width,
}) => {
  const classes = colorClasses[color] || colorClasses.cyan;
  return (
    <div
      className={`bg-black/70 backdrop-blur-md rounded border ${classes.border} p-4`}
    >
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

export default SensorCard;
