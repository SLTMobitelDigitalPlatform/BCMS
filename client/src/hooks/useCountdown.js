import { useEffect, useState } from "react";

export default function useCountdown() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // On page load, retrieve the expiration time from localStorage
    const storedExpirationTime = localStorage.getItem("otpExpirationTime");
    if (storedExpirationTime) {
      const expirationTime = parseInt(storedExpirationTime, 10);
      const currentTime = Date.now();
      const timeRemaining = Math.max(
        0,
        Math.floor((expirationTime - currentTime) / 1000)
      );

      if (timeRemaining > 0) {
        setMinutes(Math.floor(timeRemaining / 60));
        setSeconds(timeRemaining % 60);
      } else {
        setMinutes(0);
        setSeconds(0);
      }
    } else {
      setMinutes(5);
      setSeconds(0);
    }
  }, []);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            return 0;
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  function start(seconds) {
    const expirationTime = Date.now() + seconds * 1000;
    localStorage.setItem("otpExpirationTime", expirationTime);
    setMinutes(Math.floor(seconds / 60));
    setSeconds(seconds % 60);
  }

  return { minutes, seconds, start };
}
