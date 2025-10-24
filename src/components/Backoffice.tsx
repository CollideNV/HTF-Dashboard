import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Team {
  id: string;
  name: string;
  score: number;
  users: { id: string }[];
}

const Backoffice: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // For testing the endpoint requires Basic Auth
        const username = process.env.REACT_APP_AUTH_USERNAME || 'localUser';
        const password = process.env.REACT_APP_AUTH_PASSWORD || 'localPassword';
        const credentials = btoa(`${username}:${password}`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL!}/teams`, {
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
        });

        setTeams(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401 || err.response?.status === 403) {
            setError('Authentication failed when fetching teams');
          } else {
            setError(err.message);
          }
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Active Teams</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User IDs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {teams.map((team) => (
              <tr key={team.id}>
                <td className="px-6 py-4 whitespace-nowrap">{team.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{team.score}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {team.users.map(user => user.id).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Backoffice;
