import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'

import { userRecord } from '@/commons/api'
import { selectUid } from '@/store/features/users/usersSlice'
import List from '@/components/list/List'
import './record.less'
import PlayBtn from '@/components/play-btn/PlayBtn'
import { useAppDispatch } from '@/store/hooks'
import { setTracks } from '@/store/features/users/usersSlice'

const Record: React.FC = () => {
  const uid = useAppSelector(selectUid)
  const [listData, setListData] = useState([])
  const dispatch = useAppDispatch()

  async function getRecordList() {
    if (!uid) {
      return
    }
    const { code, weekData } = await userRecord({
      uid,
      type: '1'
    })
    if (code === 200) {
      // console.log(weekData);
      setListData(weekData)
    }
  }
  
  useEffect(() => {
    getRecordList()
  }, [uid])

  function handleClick() {
    dispatch(setTracks(listData))
  }

  return (
    <div className='record_box'>
      <p className='total_text'>共{ listData.length }首</p>
      <PlayBtn onClick={handleClick}></PlayBtn>
      <List data={listData}></List>
    </div>
  )
}

export default Record