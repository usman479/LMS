"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
// import AssignmentComponent from "./components/Assigns";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

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
                <div className="px-2 select-none">
        <h2 className="text-3xl font-medium mb-4">Attendance</h2>
        <Table>
          <TableCaption>Attendance.</TableCaption>
          <TableHeader className="lg:text-lg text-base">
            <TableRow>
              <TableHead className="lg:w-1/5">Date</TableHead>
              <TableHead className="lg:w-3/5 ">Session</TableHead>
              <TableHead className="lg:w-1/5">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="lg:text-base text-xs">
              <TableCell>26 May 2023</TableCell>
              <TableCell>8:30am - 9:20pm</TableCell>
              <TableCell>Present</TableCell>
            </TableRow>
            <TableRow className="lg:text-base text-xs">
              <TableCell>27 May 2023</TableCell>
              <TableCell>8:30am - 9:20pm</TableCell>
              <TableCell>Present</TableCell>
            </TableRow>
            <TableRow className="lg:text-base text-xs">
              <TableCell>28 May 2023</TableCell>
              <TableCell>8:30am - 9:20pm</TableCell>
              <TableCell>Absent</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
            </>
        );
    }
}
