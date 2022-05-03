import React, {useState, useEffect, useRef, useCallback } from 'react'
import { Outlet, NavLink } from "react-router-dom"
import {
  ClockCircleOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  LikeOutlined
} from '@ant-design/icons'
import { Spin, message } from 'antd'

import './App.less'
import AudioPlayer from "./components/audio/AudioPlayer"
import Lyric from './components/lyric/Lyric'

import { userDetail } from '@/commons/api'
import { LoadingContext } from '@/commons/context'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setProfile, selectUid, selectProfile, selectTracks } from '@/store/features/users/usersSlice'
import { audioSrcPrefix } from '@/commons/const'

import LoginModal from '@/components/login-modal/LoginModal'

const AudioMenu: React.FC = () => {
  const dispatch = useAppDispatch()

  const profile = useAppSelector(selectProfile)
  const uid = useAppSelector(selectUid)

  const [loginShow, setLoginShow] = useState(false)
  const loginHandle = useCallback(() => {
    setLoginShow(true)
  }, [])

  // userDetail
  const getUserDetail = useCallback(async () => {
    if (!uid) {
      return
    }
    const res = await userDetail({
      uid
    })
    if (res.code === 200) {
      // console.log(res);
      dispatch(setProfile(res.profile))
    }
  }, [uid])

  useEffect(() => {
    getUserDetail()
  }, [getUserDetail])

  return (
    <div className='audio_menu'>
      {
        profile.userId ?
          <div className='menu_avatar' onClick={loginHandle}>
            <img src={profile.avatarUrl} alt='avatar' className='avatar' />
            <p className='username'>{profile.nickname}</p>
          </div>
          :
          <div className='menu_avatar' onClick={loginHandle}>
            <UserOutlined style={{ fontSize: '30px' }} />
            <p className='username'>未登录</p>
          </div>
      }
      <ul className='menu_list'>
        <li className='list_item'>
          <NavLink to="rank"
            className={({ isActive }) =>
              isActive ? 'active link' : 'link'
            }>
            <LikeOutlined style={{ fontSize: '20px' }} />
            <span className='text'>精品歌单</span>
          </NavLink>
        </li>
        <li className='list_item'>
          <NavLink to="record"
            className={({ isActive }) =>
              isActive ? 'active link' : 'link'
            }>
            <ClockCircleOutlined style={{ fontSize: '20px' }} />
            <span className='text'>最近播放</span>
          </NavLink>
        </li>
        <li className='list_item'>
          <NavLink to="collection"
            className={({ isActive }) =>
              isActive ? 'active link' : 'link'
            }>
            <CustomerServiceOutlined style={{ fontSize: '20px' }} />
            <span className='text'>我的歌单</span>
          </NavLink>
        </li>
      </ul>

      <LoginModal visible={loginShow} setVisible={setLoginShow}></LoginModal>
    </div >
  )
}

const App: React.FC = () => {
  // loading
  const [loading, setLoading] = useState(false);
  const loadingContextValue = {
    toggleLoading: (val: boolean) => {
      setLoading(val)
    }
  }

  // track
  const tracks = useAppSelector(selectTracks)
  const [trackIndex, setTrackIndex] = useState(0)
  const song = tracks[trackIndex] || {}
  const audioSrc = audioSrcPrefix + song.id + '.mp3'
  const audioRef = useRef(new Audio(audioSrc))
  audioRef.current.onerror = () => {
    message.warning({
      content: '当前音乐不可播放，已自动播放下一曲',
      duration: 1
    });

    setTrackIndex((trackIndex) => {
      return trackIndex + 1
    })
  }
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <Spin spinning={loading}>
        <div className="App">
          <AudioMenu></AudioMenu>
          <AudioPlayer trackIndex={trackIndex} setTrackIndex={setTrackIndex}
            audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying}></AudioPlayer>
          <Lyric trackIndex={trackIndex} audioRef={audioRef} isPlaying={isPlaying}></Lyric>
          {/* <nav
            style={{
              paddingBottom: "1rem",
            }}
          >
            <Link to="/invoices">Invoices</Link> |{" "}
            <Link to="/expenses">Expenses</Link>
          </nav> */}
          <div className='container'>
            <Outlet />
          </div>
        </div>
      </Spin>
    </LoadingContext.Provider>
  );
}

export default App;
