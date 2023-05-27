'use client'
import Image from 'next/image'
import Courses from './components/Courses'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react';

export default async function Home() {
  const {data:session,status} = useSession();
  console.log(session?.user.s_name)

  useEffect(() => {
      // if(status === 'authenticated'){
      console.log(status)
      // }
  },[status])

  // if(status === 'loading'){
  //   console.log(session?.user?.s_name)
  //   return <p>loading...</p>
  // } 
  //  if (status === 'unauthenticated'){
  //   return <p>page not available</p>
  // }

  if(status === 'authenticated'){

    return (
      <>
  <p>Student</p>
  <p>{session.user.s_name}</p>
  {/* <Courses id={session?.user.s_id}/> */}
  {/* <p>{session.user.s_name}</p> */}
  {/* <button onClick={signOut}>signOut</button> */}
  </>
  )
}
return <p>loading...</p>
}
