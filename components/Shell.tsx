"use client";

import { AppShell, Group, Image, Title } from "@mantine/core";
import Link from "next/link";

export default function Shell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Image src="logo.png" alt="logo" h={"80%"} />
          <Link href="/">
            <Title order={1}>Piano Drills</Title>
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Main bg="#f3f8ff">{children}</AppShell.Main>
    </AppShell>
  );
}
