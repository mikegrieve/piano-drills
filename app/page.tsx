"use client";

import GameSettings from "@/components/GameSettings";
import PianoGame from "@/components/PianoGame";
import VirtualPiano from "@/components/VirtualPiano";
import { Container, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [playingGame, setPlayingGame] = useState(false);
  const [playedNotes, setPlayedNotes] = useState<Set<string>>(new Set());
  const [showPianoLabels, setShowPianoLabels] = useState(true);
  const [useSharps, setUseSharps] = useState(true);

  return (
    <Container>
      <Stack h={600} justify="space-between" align="center">
        <Stack>
          <Title ta="center">Welcome to Piano Drills</Title>
          <Text ta="center">
            Connect your digital piano and set up an exercise to practice
          </Text>
        </Stack>
        {playingGame ? (
          <PianoGame
            playedNotes={playedNotes}
            setPlayedNotes={setPlayedNotes}
          />
        ) : (
          <GameSettings
            setPlayedNotes={setPlayedNotes}
            setPlayingGame={setPlayingGame}
            showPianoLabels={showPianoLabels}
            setShowPianoLabels={setShowPianoLabels}
            useSharps={useSharps}
            setUseSharps={setUseSharps}
          />
        )}
        <Stack>
          <VirtualPiano
            notesPressed={playedNotes}
            showLabels={showPianoLabels}
            useSharps={useSharps}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
