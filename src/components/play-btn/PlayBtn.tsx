import React from 'react'
import { PlayCircleFilled } from '@ant-design/icons'

import './playBtn.less'

interface PlayBtnProps {
  onClick: () => void
}

const PlayBtn: React.FC<PlayBtnProps> = ({onClick}) => {
  return (
    <div className='play_btn_box' onClick={onClick}>
      <PlayCircleFilled style={{color: '#fff', fontSize: '18px'}} />
      <p className='btn_text'>播放全部</p>
    </div>
  )
}

export default PlayBtn