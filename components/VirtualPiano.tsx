import { Box, Title } from "@mantine/core";

import styles from "../styles/VirtualPiano.module.css";

export default function VirtualPiano({
  notesPressed,
}: {
  notesPressed: Set<string>;
}) {
  function keyColor(key: string) {
    if (notesPressed.has(key)) {
      return "blue";
    } else if (key.length > 1) {
      return "black";
    } else {
      return "white";
    }
  }
  return (
    <div className={styles.stylesContainer}>
      <div className={styles.whiteContainer}>
        <Box bg={keyColor("C")} className={styles.stylesWhite}>
          <Title>C</Title>
        </Box>
        <Box bg={keyColor("D")} className={styles.stylesWhite}>
          <Title>D</Title>
        </Box>
        <Box bg={keyColor("E")} className={styles.stylesWhite}>
          <Title>E</Title>
        </Box>
        <Box bg={keyColor("F")} className={styles.stylesWhite}>
          <Title>F</Title>
        </Box>
        <Box bg={keyColor("G")} className={styles.stylesWhite}>
          <Title>G</Title>
        </Box>
        <Box bg={keyColor("A")} className={styles.stylesWhite}>
          <Title>A</Title>
        </Box>
        <Box bg={keyColor("B")} className={styles.stylesWhite}>
          <Title>B</Title>
        </Box>
      </div>
      <div className={styles.allBlackContainer}>
        <div className={styles.blackContainer1}>
          <Box bg={keyColor("C#")} className={styles.stylesBlack}>
            <Title order={4}>C#</Title>
          </Box>
          <Box bg={keyColor("D#")} className={styles.stylesBlack}>
            <Title order={4}>D#</Title>
          </Box>
        </div>
        <div className={styles.blackContainer2}>
          <Box bg={keyColor("F#")} className={styles.stylesBlack}>
            <Title order={4}>F#</Title>
          </Box>
          <Box bg={keyColor("G#")} className={styles.stylesBlack}>
            <Title order={4}>G#</Title>
          </Box>
          <Box bg={keyColor("A#")} className={styles.stylesBlack}>
            <Title order={4}>A#</Title>
          </Box>
        </div>
      </div>
    </div>
  );
}
