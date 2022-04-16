import React, { useContext, useState, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import {
  ClockCircleOutlined,
  UserOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons'
import { Spin, Modal } from 'antd'

import './App.less'
import AudioPlayer from "./components/audio/AudioPlayer"
// import tracks from "./components/audio/tracks"

// import avatar from './assets/images/wallhaven-y8wdlx.jpeg'

import { qrKey, qrCreate, qrCheck, userAccount, userDetail } from '@/commons/api'
import { LoadingContext } from '@/commons/context'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setProfile, selectProfile } from '@/store/features/users/usersSlice'

const AudioMenu: React.FC = () => {
  const loadingContext = useContext(LoadingContext)
  const [qrShow, setQrShow] = useState(false)
  const [qrImg, setQrImg] = useState('')
  const [timer, setTimer] = useState<undefined | number>()

  const profile = useAppSelector(selectProfile)
  let navigate = useNavigate()

  function startQrCheck(key: string) {
    let timer = window.setTimeout(async () => {
      const { code } = await qrCheck({
        key
      })
      if (code === 803) {
        loadingContext.toggleLoading(true)
        setQrShow(false)
        const { code, data } = await userAccount()
        loadingContext.toggleLoading(false)
        if (code === 200) {
          console.log(data)
        }
      } else if (code === 801 || code === 802) {
        startQrCheck(key)
      }
    }, 3000)
    setTimer(timer)
  }

  function afterCloseModelHandle() {
    window.clearTimeout(timer)
  }

  async function loginHandle() {
    loadingContext.toggleLoading(true)
    const res = await qrKey()
    if (res.code === 200) {
      const res2 = await qrCreate({
        key: res.data.unikey,
        qrimg: '1'
      })
      loadingContext.toggleLoading(false)
      if (res2.code === 200) {
        setQrShow(true)
        setQrImg(res2.data.qrimg)
        startQrCheck(res.data.unikey)
      }
    } else {
      loadingContext.toggleLoading(false)
    }
  }

  function goRecordHandle() {
    navigate('/record')
  }

  function goCollectionHandle() {
    navigate('/collection')
  }

  return (
    <div className='audio_menu'>
      {
        profile.avatarUrl ?
          <div className='menu_avatar'>
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
        <li className='list_item' onClick={goRecordHandle}>
          <ClockCircleOutlined style={{ fontSize: '20px' }} />
          <span className='text'>最近播放</span>
        </li>
        <li className='list_item' onClick={goCollectionHandle}>
          <CustomerServiceOutlined style={{ fontSize: '20px' }} />
          <span className='text'>我的歌单</span>
        </li>
      </ul>

      <Modal title="网易云扫描二维码登录" visible={qrShow} footer={null}
        transitionName="" maskTransitionName="" afterClose={afterCloseModelHandle}
        onCancel={() => { setQrShow(false) }}>
        <img src={qrImg} className="qr_img" />
      </Modal>
    </div>
  )
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()

  const loadingContextValue = {
    toggleLoading: (val: boolean) => {
      setLoading(val)
    }
  }

  async function getUserDetail() {
    const res = await userDetail({
      uid: '99339350'
    })
    if (res.code === 200) {
      // console.log(res);
      dispatch(setProfile(res.profile))
    }
  }

  useEffect(() => {
    getUserDetail()
  }, [])

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <Spin spinning={loading}>
        <div className="App">
          <AudioMenu></AudioMenu>
          <AudioPlayer></AudioPlayer>
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
