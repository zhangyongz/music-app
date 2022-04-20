import React, { useEffect } from 'react'
import './lyric.less'

import img from '../../assets/images/wallhaven-y8wdlx.jpeg'

const Lyric: React.FC = () => {
  useEffect(() => {
    window.document.body.style.overflow = "hidden"
    return () => {
      window.document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className='lyric_box' id="picker">
      <div className='lyric_container'>
        <div className='cover_img'>
          <img src={img} alt="coverImg" className='img' />
        </div>
        <div className='info_wrapper'>
          <div className='info_title'>
            <p className='name'>少年锦时</p>
            <p className='label'>专辑：吉姆餐厅 歌手：赵雷</p>
          </div>
          <div className='lyric_list_wrapper'>
            <div className='lyric_list'>
              {new Array(50).fill(0).map((item, index) => {
                return (
                  <p key={index} className='lyric_item'>树阴下的人想睡</p>
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
