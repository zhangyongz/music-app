import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'

import { userRecord } from '@/commons/api'
import { selectUid } from '@/store/features/users/usersSlice'
import List from '@/components/list/List'
import './record.less'

const Record: React.FC = () => {
  const uid = useAppSelector(selectUid)
  const [listData, setListData] = useState([])

  async function getRecordList() {
    if (!uid) {
      return
    }
    const { code, weekData } = await userRecord({
      uid,
      type: '1'
    })
    if (code === 200) {
      console.log(weekData);
      setListData(weekData)
    }
  }
  useEffect(() => {
    getRecordList()
  }, [uid])

  return (
    <div className='record_box'>
      <p className='total_text'>共{ listData.length }首</p>
      <List data={listData}></List>
    </div>
  )
}

export default Record