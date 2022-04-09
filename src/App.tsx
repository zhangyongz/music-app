import React from 'react';
import './App.less';
import AudioPlayer from "./components/audio/AudioPlayer";
import tracks from "./components/audio/tracks";
import { Outlet, Link } from "react-router-dom";
import {
  BarsOutlined
} from '@ant-design/icons';

import avatar from './assets/images/wallhaven-y8wdlx.jpeg'

const AudioMenu: React.FC = () => {
  return (
    <div className='audio_menu'>
      <div className='menu_avatar'>
        <img src={avatar} alt='avatar' className='avatar'  />
        <p className='username'>usernameusernameusernameusernameusernameusername</p>
      </div>
      <ul className='menu_list'>
        <li className='list_item'>
          <BarsOutlined style={{ fontSize: '20px' }} />
          <span className='text'>正在播放</span>
        </li>
      </ul>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
      <AudioMenu></AudioMenu>
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
