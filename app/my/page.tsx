'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getCourses } from '@/lib/getData';

export default function MY() {
    const {data:session,status} = useSession();
    const [courses,setCourses] = useState(null);
    console.log(status)
    useEffect(() => {
        if(status === 'authenticated'){
            const res = getCourses(session.user.s_id).then(res =>setCourses(res))
            // console.log(res)
        }
        console.log(session?.user.s_id)
    },[status])

    if(status === 'authenticated') {
        return <p>{JSON.stringify(courses)}</p>
    }

  return (
    <div>LOADING...</div>
  )
}
