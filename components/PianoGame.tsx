import { Center, Container, TextInput } from "@mantine/core";
import { useRef, useState } from "react";
import MidiSelector from "./MidiSelector";

export default function PianoGame() {
  const [devMode, setDevMode] = useState(true);
  const [noteToGuess, _setNoteToGuess] = useState("A");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const noteToGuessRef = useRef(noteToGuess);
  const notes = ["A", "B", "C", "D", "E", "F", "G"];

  function setNoteToGuess(note: string) {
    noteToGuessRef.current = note;
    _setNoteToGuess(note);
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
    if (devMode) {
      event.preventDefault();
    }
    if (correctAnswer || wrongAnswer) {
      return;
    }

    const playedNote = devMode ? event.key.toUpperCase() : event.note.name; // midi piano or keyboard (debugging)
    console.log(playedNote);

    if (playedNote === noteToGuessRef.current) {
      const randomInt = Math.floor(Math.random() * 7);

      setCorrectAnswer(true);
      setTimeout(() => {
        setNoteToGuess(notes[randomInt]);
        setCorrectAnswer(false);
      }, 200);
    } else {
      setWrongAnswer(true);
      setTimeout(() => {
        setWrongAnswer(false);
      }, 500);
    }
  }
  return (
    <Container>
      <MidiSelector noteOn={noteOn} />
      <Center>
        <span className="text-9xl" style={{ color: color() }}>
          {noteToGuess}
        </span>
      </Center>
      {devMode && <TextInput w="40px" onKeyDown={noteOn}></TextInput>}
    </Container>
  );
}
