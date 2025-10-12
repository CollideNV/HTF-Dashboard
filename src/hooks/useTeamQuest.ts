import { useEffect, useState } from "react";

interface Mission {
  id: string;
  name: string;
  effect: string;
  objective: string;
  parameters: string;
  remainingAttempts: string;
  difficulty: number;
  solved: boolean | null;
  type: string;
}

interface Problem {
  name: string;
  description: string;
  solved: boolean;
  score: number;
  badgeUrl: string;
  mission: Mission[];
}

export interface TeamQuest {
  finished: boolean;
  problems: Problem[];
}

export const useTeamQuest = (teamId: string | null) => {
  const [quest, setQuest] = useState<TeamQuest | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!teamId) {
      setQuest(null);
      return;
    }

    const fetchTeamQuest = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/teams/${teamId}/quest`
        );
        const data = await response.json();
        setQuest(data);
      } catch (error) {
        console.error("Failed to fetch team quest data", error);
        setQuest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamQuest();
    const interval = setInterval(fetchTeamQuest, 5000);

    return () => clearInterval(interval);
  }, [teamId]);

  return { quest, loading };
};
