import { Title } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Timer({
  seconds,
  onTimeout,
}: {
  seconds: number;
  onTimeout: Function;
}) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [started, setStarted] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (secondsLeft === 0) {
      onTimeout();
    }
  });

  if (!started) {
    setStarted(true);
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);
    setIntervalId(intervalId);
  }

  if (secondsLeft <= 0 && intervalId) {
    clearInterval(intervalId);
    setIntervalId(null);
  }

  return <Title>Time: {secondsLeft}</Title>;
}
