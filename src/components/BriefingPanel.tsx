import React, { useEffect, useState } from 'react';
import { BookOpen, XCircle } from 'lucide-react';

interface BriefingPanelProps {
  onHideBriefing: () => void;
}

type Lang = 'en' | 'nl';

const TRANSLATIONS: Record<Lang, Record<string, React.ReactNode>> = {
  en: {
    title: (
      <>
        <BookOpen className="w-6 h-6 mr-3" />
        MISSION BRIEFING: HACK THE FUTURE 2025
      </>
    ),
    p1: (
      <>
        Welcome to Hack the Future 2025! You and your team are invited to a
        thrilling, fast-paced hackathon where creativity and collaboration
        rule. Think bold ideas, tight deadlines, and a dashboard that keeps
        score in real time — may the best code win.
      </>
    ),
    p2: (
      <>
        Your challenge is to build effective, creative solutions that speak
        fluently with our back-end. During the event you'll face a variety
        of code challenges that test your design, speed and problem-solving
        skills. Every solved challenge earns team points that appear live on
        the interactive dashboard — climb the leaderboard and claim bragging
        rights.
      </>
    ),
    directives: 'Challenge Highlights:',
    d1Title: 'Back-end Integration:',
    d1: 'Design endpoints, consume APIs, or craft resilient clients that communicate reliably with our infrastructure — correctness and robustness pay off.',
    d2Title: 'Code Challenges & Scoring:',
    d2: 'Tackle a mix of puzzles and practical tasks. Points are awarded based on difficulty, efficiency and creativity — elegant, fast solutions score higher.',
    d3Title: 'Interactive Dashboard:',
    d3: 'Track progress in real time, watch rankings update, and celebrate every climb on the leaderboard as your team racks up points.',
    p3: 'Expect an intense, inspiring experience: learn, network, and build something awesome. Good luck, hackers — write clean code and think big!',
  },
  nl: {
    title: (
      <>
        <BookOpen className="w-6 h-6 mr-3" />
        MISSIEBRIEFING: HACK THE FUTURE 2025
      </>
    ),
    p1: (
      <>
        Welkom bij Hack the Future 2025! Jij en je team zijn uitgenodigd voor
        een spannende en uitdagende hackathon waar innovatie en samenwerking
        centraal staan. Denk aan vlotte teamsessies, slimme hacks en een
        levendig klassement — dit wordt een ervaring om niet te vergeten.
      </>
    ),
    p2: (
      <>
        Jouw uitdaging: ontwikkel effectieve en creatieve oplossingen die
        naadloos communiceren met onze back-end. Tijdens de hackathon krijg
        je diverse code-opdrachten die je vaardigheden op de proef stellen.
        Elke opgeloste challenge levert team-punten op die direct op het
        interactieve dashboard worden bijgehouden — klim in het
        klassement en verzamel roem.
      </>
    ),
    directives: 'Wat kun je verwachten:',
    d1Title: 'Back-end Integratie:',
    d1: 'Ontwerp endpoints, gebruik APIs of bouw robuuste clients die soepel met onze infrastructuur praten — betrouwbaarheid en correctheid leveren punten op.',
    d2Title: 'Code Challenges & Scoring:',
    d2: 'Los een mix van puzzels en praktische taken op. Punten worden toegekend op basis van moeilijkheid, efficiëntie en creativiteit — snelle en nette oplossingen scoren hoger.',
    d3Title: 'Interactief Dashboard:',
    d3: 'Volg je voortgang real-time, bekijk live rankings en vier elke sprong omhoog op het leaderboard wanneer je team punten scoort.',
    p3: 'Bereid je voor op een intensieve en inspirerende ervaring — leer, netwerk en bouw iets geweldigs. Succes, hackers — codeer netjes en durf groots te denken!',
  },
};

const BriefingPanel: React.FC<BriefingPanelProps> = ({ onHideBriefing }) => {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('briefingLang') as Lang | null;
      if (stored === 'en' || stored === 'nl') setLang(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('briefingLang', lang);
    } catch (e) {
      // ignore
    }
  }, [lang]);

  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl h-[80vh] bg-slate-900/80 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/30">
          <div className="flex items-center">
            <h2 className="text-2xl font-mono text-cyan-400 flex items-center">
              {t.title}
            </h2>
            <div className="ml-4 flex items-center space-x-2">
              <button
                onClick={() => setLang('nl')}
                aria-pressed={lang === 'nl'}
                className={`px-2 py-1 rounded-md text-sm font-mono transition-colors ${
                  lang === 'nl'
                    ? 'bg-cyan-400 text-slate-900'
                    : 'text-cyan-300 hover:bg-cyan-500/10'
                }`}
                aria-label="Select Dutch"
              >
                NL
              </button>
              <button
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2 py-1 rounded-md text-sm font-mono transition-colors ${
                  lang === 'en'
                    ? 'bg-cyan-400 text-slate-900'
                    : 'text-cyan-300 hover:bg-cyan-500/10'
                }`}
                aria-label="Select English"
              >
                EN
              </button>
            </div>
          </div>
          <button
            onClick={onHideBriefing}
            className="text-cyan-400 hover:text-white"
            aria-label={lang === 'nl' ? 'Sluit briefing' : 'Close briefing'}
          >
            <XCircle className="w-8 h-8" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto text-cyan-200/80 font-mono space-y-6 leading-relaxed">
          <p>{t.p1}</p>
          <p className="text-cyan-300 border-l-4 border-cyan-400 pl-4 py-2 bg-cyan-500/10">{t.p2}</p>
          <h3 className="text-xl text-cyan-300 pt-4">{t.directives}</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="text-green-400">{t.d1Title}</span>{' '}
              {t.d1}
            </li>
            <li>
              <span className="text-yellow-400">{t.d2Title}</span>{' '}
              {t.d2}
            </li>
            <li>
              <span className="text-red-400">{t.d3Title}</span>{' '}
              {t.d3}
            </li>
          </ul>
          <p>{t.p3}</p>
        </div>
      </div>
    </div>
  );
};

export default BriefingPanel;
