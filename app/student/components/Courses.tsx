'use client'
import { useSession, signOut, getSession } from 'next-auth/react'
import { getCourses } from '@/lib/getData';
import React, { useState,useContext } from 'react'
import { useEffect } from 'react';
import { Context } from '@/lib/context';

export default async function Courses({id}:{id:string}) {

    // const value = useContext(Context);
    // console.log(session?.user.s_id)
    const data = await getCourses(id);
    
    // const [courses,setCourses] = useState(null);
    // console.log(data)
    
    // useEffect(() => {
    //     getCourses(session?.user.s_id).then(data => setCourses(data));
    // },[])
    // console.log('data: ', data)

    return (
        <>
        {/* <p>{value.s_name}</p> */}
        <p>courses</p>
            {data &&  data.map((item: { course_id: string, course_name: string }) => {
                return <p key={item.course_id}>{item.course_name}</p>
            })}
        </>
    )
}
