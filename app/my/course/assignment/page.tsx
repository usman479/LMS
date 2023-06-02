"use client";
// import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import AssignmentComponent from "./components/Assigns";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Assign = {
    assignment: {
        assignment_id: number,
        assignment_description: string,
        course_name: string,
        due_date: string,
        teacher_name: string,
        upload_date: string,
    }
}

export default function Assignment() {
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const { course_id, teacher_id, student_id } = { course_id: searchParams.get('course_id'), teacher_id: searchParams.get('teacher_id'), student_id: searchParams.get('student_id') };
    const [assignments, setAssignments] = useState<Assign[]>();

    useEffect(() => {
        console.log('saad: ', status);
        if (status === 'authenticated') {
            console.log('saad: ', status);
            fetch(`http://localhost:3000/api/assignment?course_id=${course_id}&teacher_id=${teacher_id}&student_id=${student_id}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${session.user.accessToken}`
                }
            }).then(res => res.json()).then(data => { setAssignments(prev => data); console.log(data) })
        }
    }, [status])
    if (status === 'authenticated' && assignments !== undefined) {
        console.log('ass: ', assignments)
        return (
            <>
                <TooltipProvider delayDuration={100}>
                    <div>
                        <h2 className="text-3xl font-medium select-none">Assignments</h2>
                        <ul>
                            {assignments.length > 0 ? assignments.map((assignment: Assign, index: number) => {
                                return <AssignmentComponent assignment={assignment} key={index} />
                            }) : 'NO ASSIGNMENTS'}
                        </ul>
                    </div>
                </TooltipProvider>
            </>
        );
    }
}