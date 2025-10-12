import { useState, useEffect, useRef } from 'react';

const getDeadline = () => {
  const today = new Date();
  today.setHours(Number(process.env.REACT_APP_DEADLINE_HOUR) || 16, 0, 0, 0); 
  if (today < new Date()) {
    today.setDate(today.getDate() + 1);
  }
  return today;
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
