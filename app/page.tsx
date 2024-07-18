"use client";

import PianoGame from "@/components/PianoGame";
import {
  AppShell,
  Burger,
  Container,
  Group,
  Image,
  NavLink,
  Switch,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function Home() {
  const [devMode, setDevMode] = useState(false);
  const [opened, { toggle }] = useDisclosure();

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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src="piano-games.png" alt="logo" h={"80%"} />
          <Title order={1}>Piano Games</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Container pb="10px">
          <Switch
            label="Dev Mode"
            onChange={(event) => setDevMode(event.currentTarget.checked)}
          />
        </Container>
        <NavLink label="Notes" active></NavLink>
        <NavLink label="Scales"></NavLink>
        <NavLink label="Chords"></NavLink>
        <NavLink label="Ear Training"></NavLink>
      </AppShell.Navbar>

      <AppShell.Main>
        <PianoGame devMode={devMode} />
      </AppShell.Main>
    </AppShell>
  );
}
