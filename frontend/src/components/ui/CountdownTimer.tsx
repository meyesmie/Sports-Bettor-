'use client';
import { useState, useEffect } from 'react';

export function CountdownTimer({ targetDate }: { targetDate: string | Date }) {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) {
        setTimeLeft('Kickoff');
        clearInterval(timer);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (86400000)) / (3600000));
      const mins = Math.floor((distance % 3600000) / 60000);
      setTimeLeft(`${days}d ${hours}h ${mins}m`);
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return <div className="text-center font-mono text-lg font-bold">{timeLeft}</div>;
}
