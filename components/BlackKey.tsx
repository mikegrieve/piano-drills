import { Box, Title } from "@mantine/core";

import styles from "../styles/VirtualPiano.module.css";

export default function BlackKey({
  keyName,
  keyColor,
  showLabel,
}: {
  keyName: string;
  keyColor: string;
  showLabel: boolean;
}) {
  return (
    <Box bg={keyColor} className={styles.stylesBlack}>
      {showLabel && <Title order={4}>{keyName}</Title>}
    </Box>
  );
}
