import styles from "../styles/VirtualPiano.module.css";
import WhiteKey from "./WhiteKey";
import BlackKey from "./BlackKey";

export default function VirtualPiano({
  notesPressed,
  showLabels,
}: {
  notesPressed: Set<string>;
  showLabels: boolean;
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
  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
  const pairBlackKeys = ["C#", "D#"];
  const tripleBlackKeys = ["F#", "G#", "A#"];
  return (
    <div className={styles.stylesContainer}>
      <div className={styles.whiteContainer}>
        {whiteKeys.map((keyName) => (
          <WhiteKey
            key={keyName}
            keyName={keyName}
            keyColor={keyColor(keyName)}
            showLabel={showLabels}
          />
        ))}
      </div>
      <div className={styles.allBlackContainer}>
        <div className={styles.blackContainer1}>
          {pairBlackKeys.map((keyName) => (
            <BlackKey
              key={keyName}
              keyName={keyName}
              keyColor={keyColor(keyName)}
              showLabel={showLabels}
            />
          ))}
        </div>
        <div className={styles.blackContainer2}>
          {tripleBlackKeys.map((keyName) => (
            <BlackKey
              key={keyName}
              keyName={keyName}
              keyColor={keyColor(keyName)}
              showLabel={showLabels}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
