import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Vote as VoteIcon, Zap, Waves, X } from "lucide-react";

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Vote: React.FC<VoteModalProps> = ({ isOpen, onClose }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const instructionVideoUrl = "https://vimeo.com/1026854984?share=copy&fl=sv&fe=ci";

  const handleStartVote = () => {
    setIsVoting(true);
  };

  const handleDismiss = () => {
    setIsVoting(false);
    setVoteSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-screen overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cyan-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <div className="flex items-center justify-center mb-3">
            <VoteIcon className="w-10 h-10 text-cyan-400 mr-3" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
              VOTING PROTOCOL
            </h1>
            <Zap className="w-10 h-10 text-yellow-400 ml-3 animate-pulse" />
          </div>
          <p className="text-cyan-300 font-mono text-xs mt-2 opacity-80">
            Engage democratic consensus algorithm
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border-2 border-cyan-500/50 p-6 shadow-2xl">
          {!isVoting ? (
            // Initial state
            <div className="flex flex-col items-center space-y-6">
              <button
                onClick={() => window.open(instructionVideoUrl, "_blank")}
                className="relative group cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                <div className="relative bg-white p-3 rounded-xl">
                  <QRCodeCanvas
                    value={instructionVideoUrl}
                    size={200}
                    level="H"
                    includeMargin={true}
                    fgColor="#000000"
                    bgColor="#ffffff"
                  />
                </div>
              </button>

              <div className="text-center">
                <p className="text-cyan-300 font-mono text-xs mb-2">
                  Scan to watch voting instructions
                </p>
              </div>

              {/* Start Voting Button */}
              <button
                onClick={handleStartVote}
                className="group relative px-6 py-3 font-bold text-base font-mono rounded-lg overflow-hidden transition-all duration-300 w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-100 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400 to-cyan-400 animate-pulse" />
                <span className="relative flex items-center justify-center text-white">
                  <Waves className="w-4 h-4 mr-2" />
                  START VOTING
                </span>
              </button>

              {/* Instructions */}
              <div className="border-t border-cyan-500/30 pt-4 w-full">
                <p className="text-cyan-400 font-mono text-xs font-bold mb-2">
                  VOTING PROCEDURE:
                </p>
                <ul className="space-y-1 text-cyan-300/80 font-mono text-xs">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    <span>Scan QR code to watch instructions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    <span>Click START VOTING to open portal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    <span>Cast your vote securely</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : !voteSubmitted ? (
            // Voting state
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 blur-2xl animate-pulse" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-400 animate-spin" />
                <div className="relative flex items-center justify-center">
                  <VoteIcon className="w-24 h-24 text-cyan-400 animate-pulse" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-cyan-300 font-mono mb-3">
                  VOTING INSTRUCTIONS
                </h2>
                <p className="text-cyan-300/70 font-mono text-sm mb-4">
                  Check your email for the voting portal link
                </p>
                <p className="text-cyan-300/60 font-mono text-xs leading-relaxed">
                  A secure voting portal link has been sent to your email address. Please check your inbox and spam folder to access the voting platform and cast your vote.
                </p>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className="group relative px-10 py-3 font-bold text-base font-mono rounded-lg overflow-hidden transition-all duration-300 w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-100 group-hover:opacity-80 transition-opacity" />
                <span className="relative text-white flex items-center justify-center">
                  <Zap className="w-4 h-4 mr-2" />
                  UNDERSTOOD
                </span>
              </button>

              <p className="text-yellow-400/70 font-mono text-xs text-center">
                The voting portal is secure and requires email verification
              </p>
            </div>
          ) : (
            // Success state
            <div className="flex flex-col items-center space-y-6 py-6">
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-30 blur-2xl animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full border-4 border-green-500 flex items-center justify-center">
                    <span className="text-3xl">✓</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-400 font-mono mb-1">
                  INSTRUCTIONS RECEIVED
                </h2>
                <p className="text-green-300/70 font-mono text-xs">
                  Check your email for voting access
                </p>
              </div>

              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 w-full">
                <p className="text-green-300 font-mono text-xs text-center">
                  Please check your email (including spam folder) for the voting portal link. Thank you for participating in the consensus protocol.
                </p>
              </div>

              <button
                onClick={onClose}
                className="group relative px-10 py-2 font-bold text-sm font-mono rounded-lg overflow-hidden transition-all duration-300 w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-100 group-hover:opacity-80 transition-opacity" />
                <span className="relative text-white">
                  CLOSE
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-cyan-400/40 font-mono text-xs pb-4">
          <p>SECURE VOTING PROTOCOL v2.1</p>
        </div>
      </div>
    </div>
  );
};

export default Vote;
