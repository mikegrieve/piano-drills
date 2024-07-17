import { Container, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import MidiSelector from "./MidiSelector";

export default function PianoGame() {
  const [devMode, setDevMode] = useState(true);
  const [noteToGuess, setNoteToGuess] = useState("A");
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
    event.preventDefault();
    if (correctAnswer || wrongAnswer) {
      return;
    }

    const playedNote = false ? event.note.name : event.key.toUpperCase(); // midi piano or keyboard (debugging)
    console.log(playedNote);

    if (playedNote === noteToGuess) {
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
      <Title c={color()}>{noteToGuess}</Title>
      {devMode && <TextInput w="40px" onKeyDown={noteOn}></TextInput>}
    </Container>
  );
}
