import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'

import { userRecord } from '@/commons/api'
import { selectUid } from '@/store/features/users/usersSlice'
import List from '@/components/list/List'

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
    <List data={listData}></List>
  )
}

export default Record