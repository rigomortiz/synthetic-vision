import React, { useEffect, useMemo, useCallback } from "react";
import * as Tone from "tone";

const AudioComponent: React.FC = () => {
  const audioContext = useMemo(() => new AudioContext(), []);
  const toneGain = useMemo(() => new Tone.Volume(), []);

  useEffect(() => {
    // Configura el contexto de Tone.js
    Tone.setContext(audioContext);

    // Conecta el nodo de volumen al destino
    Tone.connect(toneGain, Tone.context.destination);

    return () => {
      // Limpia el contexto de audio
      audioContext.close();
    };
  }, [audioContext, toneGain]);

  const connectStream = useCallback(
    (stream: MediaStream) => {
      const src: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
      Tone.connect(src, toneGain, 0, 0);
    },
    [audioContext, toneGain]
  );

  const initUserMedia = useCallback(async () => {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    connectStream(stream);
  }, [connectStream]);

  return (
    <div>
      <button onClick={initUserMedia}>Iniciar Audio</button>
    </div>
  );
};

export default AudioComponent;