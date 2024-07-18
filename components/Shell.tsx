"use client";

import { AppShell, Burger, Group, Image, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

export default function Shell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <NavLink component={Link} href="/notes" label="Notes"></NavLink>
        <NavLink component={Link} href="/scales" label="Scales"></NavLink>
        <NavLink label="Chords"></NavLink>
        <NavLink label="Ear Training"></NavLink>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
