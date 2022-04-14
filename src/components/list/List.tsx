import React from 'react'
import { Affix } from 'antd';

import './list.less'
import { formatMilliSecond } from '@/commons/utils'

interface listItem {
  song: {
    id: number,
    name: string,
    ar: [{ name: string }],
    al: { name: string },
    dt: number
  }
}

interface ListProps {
  data: listItem[]
}

const List: React.FC<ListProps> = (props) => {
  return (
    <div className='list_box'>
      <ul>
        <Affix offsetTop={0}>
          <li className='list_item list_title'>
            <span className='name'>音乐标题</span>
            <span className='ar'>歌手</span>
            <span className='al'>专辑</span>
            <span className='time'>播放时间</span>
          </li>
        </Affix>
        {
          props.data.map((item) => {
            return (<li key={item.song.id} className="list_item">
              <span className='name'>{item.song.name}</span>
              <span className='ar'>{item.song.ar.map((item, index) => {
                let symbol = index === 0 ? '' : ' / '
                return symbol + item.name
              })}</span>
              <span className='al'>{item.song.al.name}</span>
              <span className='time'>{formatMilliSecond(item.song.dt)}</span>
            </li>)
          })
        }
      </ul>
    </div>
  )
}

export default List