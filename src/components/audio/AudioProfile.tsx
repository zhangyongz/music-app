import React, { useState } from 'react'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectLyricShow, setLyricShow } from '@/store/features/users/usersSlice'

import { formatSecond } from '@/commons/utils'

interface AudioProfileProps {
  title: string,
  artist: string,
  image: string,
  color: string,
  duration: number,
  currentTime: number
}

const AudioProfile: React.FC<AudioProfileProps> = (props) => {
  const [maskShow, setMaskShow] = useState(false)
  const lyricShow = useAppSelector(selectLyricShow)
  const dispatch = useAppDispatch()

  function toggleLyricShow() {
    dispatch(setLyricShow(!lyricShow))
  }

  return (
    <div className="audio_profile">
      <div className='profile_img_wrapper' onMouseEnter={() => {setMaskShow(true)}}
        onMouseLeave={() => {setMaskShow(false)}} onClick={toggleLyricShow}>
        <img src={props.image} alt="" className="profile_img" />
        {maskShow ? 
        <div className='pofile_img_mask flex_center'>
          {
            lyricShow ? <ShrinkOutlined style={{color: '#fff', fontSize: '20px'}} />
             : <ArrowsAltOutlined style={{color: '#fff', fontSize: '20px'}} />
          }
        </div>
        : ''}
      </div>
      
      <div className="proflie_info">
        <p className="info_text">
          <span className='title'>{props.title}</span>
          <span className='artist'> - {props.artist}</span>
        </p>
        <p className='info_time'>
          {formatSecond(props.currentTime)}
          {' / '}
          {formatSecond(props.duration)}
        </p>
      </div>
    </div>
  )
}

export default AudioProfile