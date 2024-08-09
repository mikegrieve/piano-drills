"use client";

import PianoGame from "@/components/PianoGame";
import { Button, Container, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function Page() {
  const [showAboutPage, setShowAboutPage] = useState(true);

  if (showAboutPage) {
    return (
      <Container>
        <Title>Play the Note</Title>
        <Text>
          Hit the correct note as it appears on screen. Try to get as many as
          you can in 1 minute. Wrong notes subtract points.
        </Text>
        <Button onClick={() => setShowAboutPage(false)}>Start</Button>
      </Container>
    );
  } else {
    return <Title>Play the Note</Title>;
  }
}
