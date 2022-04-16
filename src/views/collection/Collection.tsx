import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'

import { userPlaylist } from '@/commons/api'
import { selectUid } from '@/store/features/users/usersSlice'
import { playListType } from '@/types'
import './collection.less'

const Collection: React.FC = () => {
  const uid = useAppSelector(selectUid)
  const [playList, setplayList] = useState<playListType>([])

  async function getList() {
    if (!uid) {
      return
    }
    let res = await userPlaylist({
      uid,
      limit: '100'
    })
    if (res.code === 200) {
      console.log(res);
      setplayList(res.playlist)
    }

  }
  useEffect(() => {
    getList()
  })

  return (
    <div className='collection_box'>
      <ul className='collection_wrapper'>
        {playList.map((item) => {
          return <li className='collection_item'>
            <div className='img_wrapper'>
              <img src={item.coverImgUrl} alt="" className='img' />
            </div>
            <p className='text'>{item.name}</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default Collection