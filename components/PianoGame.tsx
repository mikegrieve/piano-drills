import { Button, Center, Container, TextInput, Title } from "@mantine/core";
import { useRef, useState } from "react";
import MidiSelector from "./MidiSelector";
import Timer from "./Timer";

export default function PianoGame({ devMode }: { devMode: boolean }) {
  const [score, setScore] = useState(0);
  const [noteToGuess, _setNoteToGuess] = useState("A");
  const noteToGuessRef = useRef(noteToGuess);
  function setNoteToGuess(note: string) {
    noteToGuessRef.current = note;
    _setNoteToGuess(note);
  }
  const [gameOver, _setGameOver] = useState(false);
  const gameOverRef = useRef(gameOver);
  function setGameOver(gameOver: boolean) {
    gameOverRef.current = gameOver;
    _setGameOver(gameOver);
  }
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const notes = ["A", "B", "C", "D", "E", "F", "G"];

  function color() {
    if (correctAnswer) {
      return "green";
    } else if (wrongAnswer) {
      return "red";
    } else {
      return "black";
    }
  }

  function noteOn(event: any) {
    if (devMode) {
      event.preventDefault();
    }
    if (correctAnswer || wrongAnswer || gameOverRef.current) {
      // FIX THIS: does not work
      return;
    }

    const playedNote = devMode ? event.key.toUpperCase() : event.note.name; // midi piano or keyboard (debugging)
    console.log(playedNote);

    if (playedNote === noteToGuessRef.current) {
      const randomInt = Math.floor(Math.random() * notes.length);
      setCorrectAnswer(true);
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => {
        setNoteToGuess(notes[randomInt]);
        setCorrectAnswer(false);
      }, 200);
    } else {
      setWrongAnswer(true);
      setScore((prevScore) => prevScore - 1);
      setTimeout(() => {
        setWrongAnswer(false);
      }, 500);
    }
  }

  function startNewGame() {
    setScore(0);
    setGameOver(false);
  }

  if (gameOver) {
    return (
      <Container>
        <Title>Game Over</Title>
        <Title>Score: {score}</Title>
        <Button onClick={startNewGame}>Retry</Button>
      </Container>
    );
  } else {
    return (
      <Container>
        {devMode ? (
          <TextInput w="40px" onKeyDown={noteOn}></TextInput>
        ) : (
          <MidiSelector noteOn={noteOn} />
        )}
        <Timer seconds={10} onTimeout={() => setGameOver(true)} />
        <Title>Score: {score}</Title>
        <Center>
          <span className="text-9xl" style={{ color: color() }}>
            {noteToGuess}
          </span>
        </Center>
      </Container>
    );
  }
}
