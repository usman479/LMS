'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Material from "./components/Material";

type LectureType = {
  description:string,
  upload_date:string,
  topic:string,
  file:string
}

export default function LectureSlide() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const { course_id, teacher_id } = { course_id: searchParams.get('course_id'), teacher_id: searchParams.get('teacher_id') };
  const [lectures, setLectures] = useState<LectureType[]>();
  useEffect(() => {
    console.log('saad: ', status);
    if (status === 'authenticated') {
      console.log('saad: ', status);
      fetch(`http://localhost:3000/api/teacher_lec?course_id=${course_id}&teacher_id=${teacher_id}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${session.user.accessToken}`
        }
      }).then(res => res.json()).then(data => { setLectures(prev => data); console.log(data) })
    }
  }, [status])
  if (status === 'authenticated' && lectures !== undefined) {
    return (
      <>
        <div className="px-2">
          <h2 className="text-3xl font-medium">Lectures</h2>
          <ul>
          {typeof lectures != 'string' && lectures.length > 0 ? lectures.map((lecture,index) => {
          return <Material key={index} topic={lecture.topic} file={lecture.file} description={lecture.description} uploadDate={lecture.upload_date} />
        }) : 'No Course Materials'}
          </ul>
        </div>
      </>
    );
  }
}
