// 'use client'
// import React from 'react'
// import { useRouter } from 'next/navigation'
// export default function page() {
//     const searchParams = useSearchParams();
//     const { course_id, teacher_id, student_id } = {course_id:searchParams.get('course_id'),teacher_id:searchParams.get('teacher_id'),student_id:searchParams.get('student_id')};
//     return (
//         <div className='flex justify-center items-center'>
//             {"course id: " + course_id + " teacher id: " + teacher_id + " student id: " + student_id}
//         </div>
//     )
// }

"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
// import LectureSlide from "./LectureSlide";
// import Attendance from "./Attendance";
// import Announcement from "./Announcement";
// import Assignment from "./Assignment";
// import Quiz from "./Quiz";

export default function CoursePage() {
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const { course_id, teacher_id, student_id } = { course_id: searchParams.get('course_id'), teacher_id: searchParams.get('teacher_id'), student_id: searchParams.get('student_id') };
    // const course_name = "Course";
    const [activeButton, setActiveButton] = useState("button4");
    const [ourData, setOurData] = useState();

    useEffect(() => {
        console.log('saad: ', status);
        if (status === 'authenticated') {
            console.log('saad: ', status);
            fetch(`http://localhost:3000/api/assignment?course_id=${course_id}&teacher_id=${teacher_id}&student_id=${student_id}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${session.user.accessToken}`
                }
            }).then(res => res.json()).then(data => { setOurData(prev => data); console.log(data) })
        }
    }, [status])

    if (status === 'authenticated' && ourData) {
        return (
            <>
                {/* <div className="border-2 h-full mt-4 duration-500 p-4">
          {activeButton === "button1" ? (
            <LectureSlide />
          ) : activeButton === "button2" ? (
            <Attendance />
          ) : activeButton === "button3" ? (
            <Announcement />
          ) : activeButton === "button4" ? (
            <Assignment />
          ) : activeButton === "button5" ? (
            <Quiz />
          ) : (
            <LectureSlide />
          )}
        </div>*/}
            </> 
        );
    }

    return <p>LOADING...</p>
}
