import React from 'react';
import { BookOpen, XCircle } from 'lucide-react';

interface BriefingPanelProps {
  onHideBriefing: () => void;
}

const BriefingPanel: React.FC<BriefingPanelProps> = ({ onHideBriefing }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl h-[80vh] bg-slate-900/80 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/30">
          <h2 className="text-2xl font-mono text-cyan-400 flex items-center">
            <BookOpen className="w-6 h-6 mr-3" />
            MISSION BRIEFING: AQUATECH 250
          </h2>
          <button
            onClick={onHideBriefing}
            className="text-cyan-400 hover:text-white"
          >
            <XCircle className="w-8 h-8" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto text-cyan-200/80 font-mono space-y-6 leading-relaxed">
          <p>
            Welcome, Operatives. You have been selected for Mission AQUATECH
            250, a critical initiative to establish a sustainable human
            presence in the deep sea. Our destination is Aqua Topia, a newly
            discovered habitable zone in the Mariana Trench.
          </p>
          <p className="text-cyan-300 border-l-4 border-cyan-400 pl-4 py-2 bg-cyan-500/10">
            Your primary objective is to deploy and activate key
            infrastructure that will support long-term colonization. The
            success of this mission will determine the future of humanity's
            expansion into the oceans.
          </p>
          <h3 className="text-xl text-cyan-300 pt-4">Core Directives:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="text-green-400">Aqua-Infrastructure:</span>{" "}
              Establish foundational structures capable of withstanding the
              immense pressure of the deep sea.
            </li>
            <li>
              <span className="text-yellow-400">Data Visualization:</span>{" "}
              Develop systems to monitor and visualize critical
              environmental data, including water quality and currents.
            </li>
            <li>
              <span className="text-red-400">Pollution Detection:</span>{" "}
              Create advanced sensor networks to detect and neutralize
              pollutants, safeguarding Aqua Topia's fragile ecosystem.
            </li>
          </ul>
          <p>
            Time is of the essence. You have 8 hours to complete your
            objectives. The fate of Aqua Topia rests in your hands. Good
            luck, Operatives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BriefingPanel;
