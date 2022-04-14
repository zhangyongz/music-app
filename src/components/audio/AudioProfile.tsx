import React from 'react'
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
  return (
    <div className="audio_profile">
      <img src={props.image} alt="" className="profile_img" />
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