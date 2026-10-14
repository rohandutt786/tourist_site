"use client";

import { useState, useEffect } from "react";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(targetDateIso: string): CountdownTime {
  if (!targetDateIso) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const difference = new Date(targetDateIso).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

export function useCountdown(targetDateIso: string): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => calculateTimeLeft(targetDateIso));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDateIso));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  return timeLeft;
}
