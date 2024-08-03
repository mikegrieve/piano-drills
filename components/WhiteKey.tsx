import { Box, Title } from "@mantine/core";

import styles from "../styles/VirtualPiano.module.css";

export default function WhiteKey({
  keyName,
  keyColor,
  showLabel,
}: {
  keyName: string;
  keyColor: string;
  showLabel: boolean;
}) {
  return (
    <Box bg={keyColor} className={styles.stylesWhite}>
      {showLabel && <Title>{keyName}</Title>}
    </Box>
  );
}
