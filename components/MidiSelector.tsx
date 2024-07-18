import { useState } from "react";
import { WebMidi } from "webmidi";

export default function MidiSelector({ noteOn }: { noteOn: any }) {
  const [enabled, setEnabled] = useState(false);
  const [device, setDevice] = useState<string | null>(null);
  // Enable WEBMIDI.js and trigger the onEnabled() function when ready
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
  }

  return <div>Midi: {device}</div>;
}
