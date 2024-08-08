"use client";

import MidiSelector from "@/components/MidiSelector";
import PianoGame from "@/components/PianoGame";
import VirtualPiano from "@/components/VirtualPiano";
import { Center, Container, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [playedNotes, setPlayedNotes] = useState<Set<string>>(new Set());

  return (
    <Container>
      <Stack h={600} justify="space-between">
        <Stack>
          <Title ta="center">Welcome to Piano Drills</Title>
          <Text ta="center">
            Connect your digital piano and complete exercises to hone your
            skills.
          </Text>
        </Stack>
        <PianoGame playedNotes={playedNotes} setPlayedNotes={setPlayedNotes} />
        <Center>
          <Stack>
            <Center>
              <MidiSelector setPlayedNotes={setPlayedNotes} />
            </Center>
            <VirtualPiano notesPressed={playedNotes} showLabels={false} />
          </Stack>
        </Center>
      </Stack>
    </Container>
  );
}
