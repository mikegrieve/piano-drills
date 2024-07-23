"use client";

import PianoGame from "@/components/PianoGame";
import { Button, Container, Switch, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function Page() {
  const [showAboutPage, setShowAboutPage] = useState(true);
  const [devMode, setDevMode] = useState(false);

  if (showAboutPage) {
    return (
      <Container>
        <Title>Play the Note</Title>
        <Text>
          Hit the correct note as it appears on screen. Try to get as many as
          you can in 1 minute. Wrong notes subtract points.
        </Text>
        <Switch
          label="Dev Mode"
          onChange={(event) => setDevMode(event.currentTarget.checked)}
        />
        <Button onClick={() => setShowAboutPage(false)}>Start</Button>
      </Container>
    );
  } else {
    return <PianoGame devMode={devMode} />;
  }
}
