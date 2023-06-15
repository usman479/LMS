'use client'
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Announce from "./components/Announce";

type AnnounceType = {
  description: string,
  upload_date: string
}

export default function Announcement() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const { course_id, student_id } = { course_id: searchParams.get('course_id'), student_id: searchParams.get('student_id') };
  const [announcements, setAnnouncements] = useState<AnnounceType[]>();
  useEffect(() => {
    console.log('saad: ', status);
    if (status === 'authenticated') {
      console.log('saad: ', status);
      fetch(`http://localhost:3000/api/announcement?course_id=${course_id}&student_id=${student_id}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${session.user.accessToken}`
        }
      }).then(res => res.json()).then(data => { setAnnouncements(prev => data); console.log(data) })
    }
  }, [status])
  if (status === 'authenticated' && announcements !== undefined) {
    return (
      <>
        {typeof announcements != 'string' && announcements.length > 0 ? announcements.map(announcement => {
          return <Announce description={announcement.description} uploadDate={announcement.upload_date} />
        }) : 'No Announcement'}
      </>
    );
  }
}
