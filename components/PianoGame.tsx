import { Button, Center, Container, Stack, Title } from "@mantine/core";
import { useState } from "react";
import MidiSelector from "./MidiSelector";
import Timer from "./Timer";
import VirtualPiano from "./VirtualPiano";

export default function PianoGame() {
  const [score, setScore] = useState(0);
  const [noteToGuess, setNoteToGuess] = useState(() => getRandomNote(""));
  const [playedNotes, setPlayedNotes] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState(false);
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

  if (!gameOver && !correctAnswer && !wrongAnswer && playedNotes.size > 0) {
    const notesToGuess = new Set([noteToGuess]);
    if (playedNotes.symmetricDifference(notesToGuess).size === 0) {
      setCorrectAnswer(true);
      setScore(score + 1);
      setTimeout(() => {
        setPlayedNotes((prev) => {
          prev.delete(noteToGuess);
          return new Set(prev);
        });
        setNoteToGuess(getRandomNote(noteToGuess));
        setCorrectAnswer(false);
      }, 200);
    } else {
      setWrongAnswer(true);
      setScore(score - 1);
      setTimeout(() => {
        setWrongAnswer(false);
      }, 1000);
    }
  }

  function startNewGame() {
    setScore(0);
    setGameOver(false);
  }

  return (
    <Container>
      <MidiSelector setPlayedNotes={setPlayedNotes} />
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
              <VirtualPiano notesPressed={playedNotes} showLabels={true} />
            </Center>
          </>
        )}
      </Stack>
    </Container>
  );
}
