"use client";

import { AppShell, Burger, Group, Image, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Shell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

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
          <Image src="logo.png" alt="logo" h={"80%"} />
          <Link href="/">
            <Title order={1}>Piano Drills</Title>
          </Link>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          href="/notes"
          label="Notes"
          active={pathname === "/notes"}
        ></NavLink>
        <NavLink
          component={Link}
          href="/scales"
          label="Scales"
          active={pathname === "/scales"}
        ></NavLink>
        <NavLink
          component={Link}
          href="/chords"
          label="Chords"
          active={pathname === "/chords"}
        ></NavLink>
        <NavLink
          component={Link}
          href="/ear-training"
          label="Ear Training"
          active={pathname === "/ear-training"}
        ></NavLink>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
