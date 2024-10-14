import { useEffect, useRef, useState } from "react";

type DeviceInfo = {
  deviceId: string,
  label: string
}

const VideoInput = () => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  useEffect(() => {
    async function getDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter(device => device.kind === 'videoinput')
          .map(device => ({ deviceId: device.deviceId, label: device.label || `Camera ${devices.indexOf(device) + 1}` }));
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error getting devices:', error);
      }
    }

    getDevices();
  }, []);

  useEffect(() => {
    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    }

    setupWebcam();
  }, []);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col">
        <div>Test Webcam</div>
        <div className="h-[720px]">
          <video ref={videoRef} autoPlay className="h-[720px]"/>
        </div>
        {/* TODO: Make this more remote-friendly */}
        <select value={selectedDevice} onChange={handleDeviceChange}>
          {devices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
    </>

  )
}

export default VideoInput