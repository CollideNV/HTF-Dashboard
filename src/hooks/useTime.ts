import { useState, useEffect, useRef } from 'react';

const getDeadline = () => {
  const deadlineDate = process.env.REACT_APP_DEADLINE_DATE || "2025-11-12T16:00:00";
  return new Date(deadlineDate);
};

const useTime = () => {
  const [time, setTime] = useState(new Date());
  const deadlineRef = useRef<Date>(getDeadline());

  const [timeLeft, setTimeLeft] = useState(deadlineRef.current.getTime() - time.getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      setTimeLeft(deadlineRef.current.getTime() - now.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeLeft = (ms: number): string => {
    if (ms < 0) {
      return "00:00:00";
    }
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return { time, timeLeft, formatTimeLeft };
};

export default useTime;
