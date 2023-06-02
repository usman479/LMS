"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
// import AssignmentComponent from "./components/Assigns";

export default function attendancePage() {
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const { course_id, teacher_id, student_id } = { course_id: searchParams.get('course_id'), teacher_id: searchParams.get('teacher_id'), student_id: searchParams.get('student_id') };
    const [attendance, setAttendance] = useState();
    useEffect(() => {
        console.log('saad: ', status);
        if (status === 'authenticated') {
            console.log('saad: ', status);
            fetch(`http://localhost:3000/api/attendance?course_id=${course_id}&teacher_id=${teacher_id}&student_id=${student_id}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${session.user.accessToken}`
                }
            }).then(res => res.json()).then(data => { setAttendance(prev => data); console.log(data) })
        }
    }, [status])
    if (status === 'authenticated' && attendance) {
        console.log('ass: ', attendance)
        return (
            <>
                <p className="flex justify-center items-center">{JSON.stringify(attendance)}</p>
            </>
        );
    }
}
