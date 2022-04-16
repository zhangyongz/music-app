import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";

import List from '@/components/list/List'
import PlayBtn from '@/components/play-btn/PlayBtn'
import { useAppDispatch } from '@/store/hooks'
import { playlistDetail } from '@/commons/api'
import { setTracks } from '@/store/features/users/usersSlice'

const PlayList: React.FC = () => {
  const [listData, setListData] = useState([])
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  async function getPlaylistDetail() {
    const { code, playlist } = await playlistDetail({
      id: searchParams.get('id')
    })
    if (code === 200) {
      // console.log(playlist);
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
    <div>
      <p className='total_text'>共{ listData.length }首</p>
      <PlayBtn onClick={handleClick}></PlayBtn>
      <List data={listData}></List>
    </div>
  )
}

export default PlayList