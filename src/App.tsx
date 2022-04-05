import React from 'react';
import './App.less';
import AudioPlayer from "./components/audio/AudioPlayer";
import tracks from "./components/audio/tracks";
import { Outlet, Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <AudioPlayer tracks={tracks}></AudioPlayer>
      <nav
        style={{
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
