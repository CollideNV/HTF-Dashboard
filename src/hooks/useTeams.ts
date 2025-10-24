import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Mission {
  type: string;
  difficulty: number;
  remainingAttempts: number;
  solved: boolean | null;
}

interface Problem {
  mission: Mission[];
}

interface ApiTeam {
  name: string;
  score: number;
  problems: Problem[];
}

export interface Team {
  id: number;
  name: string;
  score: number;
  members: number;
  problems: Problem[];
  activeMission: {
    type: string;
    difficulty: number;
    remainingAttempts: number;
  } | null;
}

interface CustomWebSocket extends WebSocket {
  _pingInterval?: NodeJS.Timeout;
}

const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<CustomWebSocket | null>(null);

  useEffect(() => {
    // --- Helper: Fetch teams from REST API ---
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL!}/dashboard`
        );
        const data: ApiTeam[] = response.data;

        const transformedTeams: Team[] = data.map((team, index) => {
          const activeMission = team.problems
            ?.flatMap((p) => p.mission)
            .find((m) => m.solved === null);

          return {
            id: index + 1,
            name: team.name,
            score: team.score,
            members: 2 + Math.floor(Math.random() * 3), 
            problems: team.problems,
            activeMission: activeMission
              ? {
                  type: activeMission.type,
                  difficulty: activeMission.difficulty,
                  remainingAttempts: activeMission.remainingAttempts,
                }
              : null,
          };
        });

        setTeams(transformedTeams);
        setApiError(null);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setApiError(
          "CRITICAL ERROR: Submarine OS connection to surface command lost. Retrying..."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();

    const connectWebSocket = () => {
      const socket: CustomWebSocket = new WebSocket(
        process.env.REACT_APP_WS_URL!
      );
      ws.current = socket;

      socket.onopen = () => {
        console.log("[WS] Connected");
        setApiError(null);

        socket._pingInterval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) socket.send("ping");
        }, 30000);
      };

      socket.onmessage = (event) => {
        const message = event.data;

        if (message === "pong") return;
        if (message === "update-dashboard") {
          console.log("[WS] Update signal received — refetching API...");
          fetchTeams(); 
          return;
        }

        try {
          const data: ApiTeam[] = JSON.parse(message);
          if (!Array.isArray(data)) return;

          const transformedTeams: Team[] = data.map((team, index) => {
            const activeMission = team.problems
              ?.flatMap((p) => p.mission)
              .find((m) => m.solved === null);

            return {
              id: index + 1,
              name: team.name,
              score: team.score,
              members: 2 + Math.floor(Math.random() * 3),
              problems: team.problems,
              activeMission: activeMission
                ? {
                    type: activeMission.type,
                    difficulty: activeMission.difficulty,
                    remainingAttempts: activeMission.remainingAttempts,
                  }
                : null,
            };
          });

          setTeams(transformedTeams);
        } catch (err) {
          console.warn("[WS] Non-JSON message ignored:", message);
        }
      };

      socket.onerror = (error) => {
        console.error("[WS] Error:", error);
        setApiError("WebSocket connection error. Trying to reconnect...");
      };

      socket.onclose = (e) => {
        console.warn(`[WS] Closed (${e.code}). Reconnecting in 5s...`);
        if (socket._pingInterval) clearInterval(socket._pingInterval);
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        if (ws.current._pingInterval) clearInterval(ws.current._pingInterval);
        ws.current.close();
      }
    };
  }, []);

  return { teams, apiError, isLoading };
};

export default useTeams;
