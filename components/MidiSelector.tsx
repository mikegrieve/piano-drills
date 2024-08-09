import { Badge } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { NoteMessageEvent, WebMidi } from "webmidi";

export default function MidiSelector({
  setPlayedNotes,
}: {
  setPlayedNotes: Dispatch<SetStateAction<Set<string>>>;
}) {
  const [enabled, setEnabled] = useState(false);
  const [device, setDevice] = useState<string | null>(null);
  // needs to be triggered by user selecting this input
  if (!enabled) {
    WebMidi.enable().then(onEnabled);
    setEnabled(true);
  }

  // Function triggered when WEBMIDI.js is ready
  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      console.log("No device detected");
      return;
    } else {
      WebMidi.inputs.forEach((device, index) => {
        setDevice(device.name);
      });
    }

    const mySynth = WebMidi.inputs[0];

    mySynth.channels[1].addListener("noteon", noteOn);
    mySynth.channels[1].addListener("noteoff", noteOff);
  }

  function noteOn(event: NoteMessageEvent) {
    const playedNote = event.note.name + (event.note.accidental || "");
    setPlayedNotes((prev) => new Set(prev.add(playedNote)));
  }

  function noteOff(event: NoteMessageEvent) {
    const playedNote = event.note.name + (event.note.accidental || "");
    setPlayedNotes((prev) => {
      prev.delete(playedNote);
      return new Set(prev);
    });
  }

  return (
    <Badge color={device ? "green" : "red"}>
      {device ? "Connected" : "Not Connected"}
    </Badge>
  );
}
