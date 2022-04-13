import React from 'react'

interface listItem {
  song: any
}

interface ListProps {
  data: listItem[]
}

const List: React.FC<ListProps> = (props) => {
  return (
    <>
      {
        props.data.map((item) => {
          return (<div key={item.song.id}>{item.song.name}</div>)
        })
      }
    </>
  )
}

export default List