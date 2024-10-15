import { useEffect, useState, useRef } from "react";

interface AudioDeviceInfo {
  deviceId: string;
  label: string;
}

const AudioInput: React.FC = () => {
  const [audioDevices, setAudioDevices] = useState<AudioDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [volume, setVolume] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    async function getAudioDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices
          .filter(device => device.kind === "audioinput")
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Microphone ${audioDevices.length + 1}`
          }));
        setAudioDevices(audioInputs);
        if (audioInputs.length > 0) {
          setSelectedAudioDevice(audioInputs[0].deviceId);
        }
      } catch (error) {
        console.error("Error getting audio devices:", error);
      }
    }

    getAudioDevices();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    async function setupAudioStream() {
      if (!selectedAudioDevice) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: selectedAudioDevice } }
        });

        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }

        const source = audioContextRef.current.createMediaStreamSource(stream);
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function updateVolume() {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
            setVolume(average);
          }
          animationFrameRef.current = requestAnimationFrame(updateVolume);
        }

        updateVolume();
      } catch (error) {
        console.error("Error accessing audio device:", error);
      }
    }

    setupAudioStream();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [selectedAudioDevice]);

  const handleAudioDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAudioDevice(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div>Test Microphone</div>
      <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-100 ease-out"
          style={{ width: `${(volume / 255) * 100}%` }}
        />
      </div>
      <select
        value={selectedAudioDevice}
        onChange={handleAudioDeviceChange}
      >
        {audioDevices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AudioInput;