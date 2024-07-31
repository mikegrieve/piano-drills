import { Button, Center, Container, Stack, Title } from "@mantine/core";
import { useRef, useState } from "react";
import MidiSelector from "./MidiSelector";
import Timer from "./Timer";
import VirtualPiano from "./VirtualPiano";

export default function PianoGame() {
  const [score, setScore] = useState(0);
  const [noteToGuess, _setNoteToGuess] = useState(() => getRandomNote(""));
  const noteToGuessRef = useRef(noteToGuess);
  function setNoteToGuess(note: string) {
    noteToGuessRef.current = note;
    _setNoteToGuess(note);
  }
  const [playedNotes, setPlayedNotes] = useState<Set<string>>(new Set());
  const [gameOver, _setGameOver] = useState(false);
  const gameOverRef = useRef(gameOver);
  function setGameOver(gameOver: boolean) {
    gameOverRef.current = gameOver;
    _setGameOver(gameOver);
  }
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  function getRandomNote(currNote: string) {
    const notes = new Set(["A", "B", "C", "D", "E", "F", "G"]);
    notes.delete(currNote);
    const randomInt = Math.floor(Math.random() * notes.size);
    return Array.from(notes)[randomInt];
  }

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
    if (correctAnswer || wrongAnswer || gameOverRef.current) {
      // FIX THIS: does not work
      return;
    }

    let playedNote: string = event.note.name;
    if (event.note.accidental) {
      playedNote = playedNote + event.note.accidental;
    }
    setPlayedNotes((prev) => new Set(prev.add(playedNote)));

    if (playedNote === noteToGuessRef.current) {
      setCorrectAnswer(true);
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => {
        setNoteToGuess(getRandomNote(noteToGuessRef.current));
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

  function noteOff(event: any) {
    const note = event.note;
    let playedNote = note.name;
    if (note.accidental) {
      playedNote += note.accidental;
    }
    setPlayedNotes((prev) => {
      prev.delete(playedNote);
      return new Set(prev);
    });
  }

  function startNewGame() {
    setScore(0);
    setGameOver(false);
  }

  return (
    <Container>
      <MidiSelector noteOn={noteOn} noteOff={noteOff} />
      <Stack h={600} align="stretch" justify="space-around">
        {gameOver ? (
          <Container>
            <Title>Game Over</Title>
            <Title ta="center">Score: {score}</Title>
            <Center>
              <Button onClick={startNewGame}>Retry</Button>
            </Center>
          </Container>
        ) : (
          <>
            <div>
              <Timer seconds={20} onTimeout={() => setGameOver(true)} />
              <Title>Score: {score}</Title>
            </div>
            <Center>
              <span className="text-9xl" style={{ color: color() }}>
                {noteToGuess}
              </span>
            </Center>
            <Center>
              <VirtualPiano notesPressed={playedNotes} />
            </Center>
          </>
        )}
      </Stack>
    </Container>
  );
}
