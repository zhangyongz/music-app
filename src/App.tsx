import React from 'react';
import './App.css';
import AudioPlayer from "./components/audio/AudioPlayer";
import tracks from "./components/audio/tracks";

const App: React.FC = () =>  {
  return (
    <div className="App">
     <AudioPlayer tracks={tracks}></AudioPlayer>
    </div>
  );
}

export default App;
