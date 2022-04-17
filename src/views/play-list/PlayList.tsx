import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";

import List from '@/components/list/List'
import PlayBtn from '@/components/play-btn/PlayBtn'
import { useAppDispatch } from '@/store/hooks'
import { playlistDetail } from '@/commons/api'
import { setTracks } from '@/store/features/users/usersSlice'
import './playList.less'
import { playListInfoInterface } from '@/types';

const PlayList: React.FC = () => {
  const [listData, setListData] = useState([])
  const [info, setInfo] = useState<playListInfoInterface>({
    coverImgUrl: '',
    name: '',
    tags: [],
    description: ''
  })
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  async function getPlaylistDetail() {
    const { code, playlist } = await playlistDetail({
      id: searchParams.get('id')
    })
    if (code === 200) {
      // console.log(playlist);
      setInfo(playlist)
      setListData(playlist.tracks)
    }
  }

  function handleClick() {
    dispatch(setTracks(listData))
  }

  useEffect(() => {
    getPlaylistDetail()
  }, [])

  return (
    <div className='play_list_box'>
      <div className='pannel'>
        <img src={info.coverImgUrl} alt="coverImg" className='img' />
        <div className='info'>
          <p className='info_name'>
            <span className='info_name_label'>歌单</span>
            <span className='info_name_text'>{info.name}</span>
          </p>
          {/* <p className='total_text'>共{listData.length}首</p> */}
          <PlayBtn onClick={handleClick} className='info_btn'></PlayBtn>
          <p className='info_tag'>
            <span className='info_tag_label'>标 签: </span>
            <span className='info_tag_text'>{info.tags.join(' / ')}</span>
          </p>
          <p className='info_desc'>
            <span className='info_desc_label'>简 介: </span>
            <span className='info_desc_text'>{info.description}</span>
          </p>
        </div>
      </div>

      <List data={listData}></List>
    </div>
  )
}

export default PlayList