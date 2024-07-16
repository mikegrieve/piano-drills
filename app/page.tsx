"use client";

import { AppShell, Burger, Group, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { WebMidi } from "webmidi";

// awesome panda, macovsky-ruby, gozilla

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  const [enabled, setEnabled] = useState(false);
  const [noteToGuess, setNoteToGuess] = useState("A");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const notes = ["A", "B", "C", "D", "E", "F", "G"];

  function noteOn(event: any) {
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

  // Enable WEBMIDI.js and trigger the onEnabled() function when ready
  if (!enabled) {
    WebMidi.enable().then(onEnabled);
    setEnabled(true);
  }

  // Function triggered when WEBMIDI.js is ready
  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      console.log("No device detected");
      return;
    } else {
      WebMidi.inputs.forEach((device, index) => {
        console.log(`${index}: ${device.name}`);
      });
    }

    const mySynth = WebMidi.inputs[0];

    mySynth.channels[1].addListener("noteon", noteOn);
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

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h={"100%"} px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={1}>Piano Games</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>
        <p className="text-7xl">Play the Note</p>
        <p className="text-8xl" style={{ color: color() }}>
          {noteToGuess}
        </p>
        <TextInput
          label="Input label"
          description="Input description"
          placeholder="Input placeholder"
          onKeyDown={noteOn}
        />
      </AppShell.Main>
    </AppShell>
  );
}
