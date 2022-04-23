import React, { useEffect, useState, useRef } from 'react'

import './lyric.less'
import { useAppSelector } from '@/store/hooks'
import { selectLyricShow, selectTracks } from '@/store/features/users/usersSlice'
import { getLyric } from '@/commons/api'
// import img from '../../assets/images/wallhaven-y8wdlx.jpeg'
import { track } from '@/types'
import { scrollTopTo } from '@/commons/utils'

interface LyricProps {
  trackIndex: number,
  audioRef: React.MutableRefObject<HTMLAudioElement>,
  isPlaying: boolean,
}

interface lyricItemInterface {
  time: number,
  text: string
}

// 歌词解析
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
function parseLyric(lrc: string) {
  const lines = lrc.split('\n')
  const lyric = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const result = timeExp.exec(line)
    if (!result) {
      continue
    }
    const text = line.replace(timeExp, '').trim()
    // if (text) {
    lyric.push({
      time: (parseFloat(result[1]) * 6e4 + parseFloat(result[2]) * 1e3 + (parseFloat(result[3]) || 0) * 1) / 1e3,
      text
    })
    // }
  }
  return lyric
}


const Lyric: React.FC<LyricProps> = ({ trackIndex, audioRef, isPlaying }) => {
  const tracks = useAppSelector(selectTracks)
  const song: track = tracks[trackIndex]

  // 歌词
  // const [lyric, setLyric] = useState<lyricItemInterface[]>([])
  const lyric = useRef<lyricItemInterface[]>([])
  async function getLyricHandle() {
    if (!song) {
      return
    }
    const res = await getLyric({
      id: song.id.toString()
    })
    if (res.code === 200) {
      // setLyric(parseLyric(res.lrc.lyric))
      lyric.current = parseLyric(res.lrc.lyric)
    }
  }
  useEffect(() => {
    getLyricHandle()
  }, [tracks, trackIndex])

  // 展示
  const lyricShow = useAppSelector(selectLyricShow)
  useEffect(() => {
    let val = 'auto'
    if (lyricShow) {
      val = 'hidden'
    }
    window.document.body.style.overflow = val
  }, [lyricShow])
  let className = lyricShow ? 'active' : 'deactive'

  // 歌词高亮
  const [lyricIndex, setLyricIndex] = useState(0)
  const intervalRef = useRef<undefined | number>()

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (audioRef.current.ended) {
        return
      }
      const { currentTime } = audioRef.current
      const index = lyric.current.findIndex((item) => {
        return item.time > currentTime
      })
      setLyricIndex(index - 1 || 0)
    }, 500);
  };
  useEffect(() => {
    if (isPlaying) {
      startTimer()
    } else {
      clearInterval()
    }
  }, [isPlaying])

  // 歌词滚动
  const listWrapper = useRef<HTMLDivElement>(null)
  const [midIndex, setMidIndex] = useState(0)
  useEffect(() => {
    const offsetHeight = listWrapper.current?.offsetHeight || 0
    // console.log(offsetHeight);
    setMidIndex(Math.floor(offsetHeight / 2 / 28))
  }, [])
  useEffect(() => {
    const distanceIndex = lyricIndex - midIndex - 1
    // console.log(distanceIndex);
    if (distanceIndex > 0) {
      if (listWrapper.current) {
        scrollTopTo(listWrapper.current, distanceIndex * 28)
        // listWrapper.current.scrollTop = (distanceIndex * 28)
      }
    }
  }, [lyricIndex])



  return (
    <div className={'lyric_box ' + className} id="picker">
      <div className='lyric_container'>
        <div className='cover_img'>
          <img src={song?.al.picUrl} alt="coverImg" className={'img ' + (isPlaying ? 'rotate' : '')} />
        </div>

        <div className='info_wrapper'>
          <div className='info_title'>
            <p className='name'>{song?.name}</p>
            <p className='label'>专辑：{song?.al.name} 歌手：{song?.ar.map((item) => {
              return item.name
            }).join(' / ')}</p>
          </div>

          <div className='lyric_list_wrapper' ref={listWrapper}>
            <div className='lyric_list'>
              {lyric.current.map((item, index) => {
                let active = index === lyricIndex ? 'active' : ''
                return (
                  <p key={index} className={'lyric_item ' + active}>{item.text}</p>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lyric
