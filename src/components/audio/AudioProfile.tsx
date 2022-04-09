import React from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

interface AudioProfileProps {
  title: string,
  artist: string,
  image: string,
  color: string,
  duration: number,
  currentTime: number
}

function formatSecond(second: number) {
  if (isNaN(second)) {
    return '00:00'
  }
  return dayjs.duration(second, "second").format('mm:ss')
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