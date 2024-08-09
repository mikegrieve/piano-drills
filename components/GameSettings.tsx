import {
  Button,
  Fieldset,
  Group,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Switch,
} from "@mantine/core";
import MidiSelector from "./MidiSelector";

export default function GameSettings({
  setPlayedNotes,
  setPlayingGame,
  showPianoLabels,
  setShowPianoLabels,
  useSharps,
  setUseSharps,
}: {
  setPlayedNotes: any;
  setPlayingGame: any;
  showPianoLabels: any;
  setShowPianoLabels: any;
  useSharps: any;
  setUseSharps: any;
}) {
  return (
    <Paper h="300" w="600" withBorder>
      <Stack h="300" justify="space-evenly" align="center">
        <Fieldset legend="Piano" variant="filled">
          <Group>
            <MidiSelector setPlayedNotes={setPlayedNotes} />
            <Switch
              checked={showPianoLabels}
              onChange={(event) =>
                setShowPianoLabels(event.currentTarget.checked)
              }
              label="Show Key Labels"
            />
            <Switch
              checked={useSharps}
              onChange={(event) => setUseSharps(event.currentTarget.checked)}
              label="Use Sharps"
              disabled={showPianoLabels === false}
            />
          </Group>
        </Fieldset>
        <Fieldset legend="Exercise">
          <Group>
            <Select
              placeholder="Pick value"
              value="Play the Note"
              data={["Play the Note"]}
            />
            <SegmentedControl
              value={"White Keys"}
              data={["White Keys", "Black Keys", "Both"]}
              disabled={true}
            />
          </Group>
        </Fieldset>
        <Button onClick={() => setPlayingGame(true)}>Start</Button>
      </Stack>
    </Paper>
  );
}
