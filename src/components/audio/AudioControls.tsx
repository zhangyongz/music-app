import React from 'react';
import { ReactComponent as Play } from './assets/play.svg';
import { ReactComponent as Pause } from './assets/pause.svg';
import { ReactComponent as Next } from './assets/next.svg';
import { ReactComponent as Prev } from './assets/prev.svg';

interface AudioControlsProps {
  isPlaying: boolean,
  onPlayPauseClick: (val: boolean) => void,
  onPrevClick: () => void,
  onNextClick: () => void
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick
}) => {
  return (
    <div className="audio-controls">
      <button
        type="button"
        className="prev"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <Prev />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className="pause"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <Play />
        </button>
      )}
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClick={onNextClick}
      >
        <Next />
      </button>
    </div>
  )
}

export default AudioControls;