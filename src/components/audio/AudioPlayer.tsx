import React, { useState, useRef, useEffect } from "react"
import { useAppSelector } from '@/store/hooks'

import AudioControls from './AudioControls'
import AudioProfile from './AudioProfile'
import './style.less'
import type { artist } from '@/types'
import { selectTracks } from '@/store/features/users/usersSlice'
import { audioSrcPrefix } from '@/commons/const'

const AudioPlayer: React.FC = () => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const tracks = useAppSelector(selectTracks)
  // console.log(tracks);

  // Destructure for conciseness
  // let title = ''
  // let artist = ''
  // let color = ''
  // let image = ''
  // let audioSrc = ''
  // let audioRef = useRef(new Audio(audioSrc));

  // if (tracks[trackIndex]) {
  const song = tracks[trackIndex]?.song || {};
  const title = song.name
  const artist = song.ar?.map((item: artist) => {
    return item.name
  }).join(',')
  const color = ''
  const image = song.al?.picUrl
  const audioSrc = audioSrcPrefix + song.id + '.mp3'
  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  // }

  const intervalRef = useRef<undefined | number>();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration, currentTime } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #c4463a), color-stop(${currentPercentage}, #fff))
  `;

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer()
    } else {
      clearInterval(intervalRef.current)
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    const audioRefCur = audioRef.current
    return () => {
      audioRefCur.pause();
      // clearInterval(intervalRef.current);
    }
  }, []);

  // Handle setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    // audioRef.current = new Audio(audioSrc);
    audioRef.current.src = audioSrc;
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      // startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex, tracks]);

  const onScrub = (value: string) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = Number(value);
    setTrackProgress(audioRef.current.currentTime);
  }

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }

  return (
    <div className="audio_player">
      <div className="audio_bar">
        <AudioProfile
          title={title}
          artist={artist}
          image={image}
          color={color}
          duration={duration}
          currentTime={currentTime}
        >
        </AudioProfile>

        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        >
        </AudioControls>

        <div className="right_wrapper"></div>

        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="audio_progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
    </div>
  )
}

export default AudioPlayer