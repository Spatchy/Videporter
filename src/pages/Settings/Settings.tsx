import AudioInput from "./AudioInput"
import VideoInput from "./VideoInput"

const Groups = () => {
  return (
    <div className="flex flex-col">
      <div className="text-7xl">Settings</div>
      <div className="flex flex-col">
        <VideoInput />
        <div className="mt-4"></div>
        <AudioInput />
      </div>
    </div>
  )
}

export default Groups