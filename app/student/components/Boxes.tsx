import React from 'react'

export default function Boxes(data:any) {
  return (
    <>
        {data &&  data.map((item: { course_id: string, course_name: string }) => {
            return <p key={item.course_id}>{item.course_name}</p>
        })}
    </>
  )
}
