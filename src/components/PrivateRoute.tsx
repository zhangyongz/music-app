import React, { useEffect } from 'react'

import { setLyricShow } from '@/store/features/users/usersSlice'
import { useAppDispatch } from '@/store/hooks'

interface Props {
  component: React.ComponentType
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setLyricShow(false))
  })

  return <RouteComponent />
}