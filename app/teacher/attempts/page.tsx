'use client'
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Student {
    s_id: string;
    s_name: string;
    uploadDate: string;
    marks_obtained: number;
    total_marks: number;
}

export default function QuizSubmissionsPage() {
    const searchParams = useSearchParams();
    const { q_id,c_id } = { q_id: searchParams.get('q_id'),c_id: searchParams.get('c_id') };
    const { data: session, status } = useSession();
    const [authenticated, setAuthenticated] = useState(false);
    const [students, setStudents] = useState<Student[]>()
    const router = useRouter();
    // let students: Student[] = [
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "8/10",
    //     },
    //     {
    //         id: "2",
    //         name: "Jane Smith",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "7/10",
    //     },
    //     {
    //         id: "3",
    //         name: "Sophia Anderson",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "5/10",
    //     },
    //     {
    //         id: "4",
    //         name: "James	Brown",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "0/10",
    //     },
    //     {
    //         id: "5",
    //         name: "Sarah	Walker",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "4/10",
    //     },
    //     {
    //         id: "6",
    //         name: "Mark Anderson",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "8/10",
    //     },
    //     {
    //         id: "7",
    //         name: "William Marcus",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "10/10",
    //     },
    //     {
    //         id: "8",
    //         name: "Mark Fellow",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "9/10",
    //     },
    //     {
    //         id: "9",
    //         name: "Gare Ferguson",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "10/10",
    //     },
    //     {
    //         id: "10",
    //         name: "Morticia Butt",
    //         uploadDate: "2023-05-23 00:00:00",
    //         quizmarks: "0/10",
    //     },
    // ];

    useEffect(() => {
        if (status == 'authenticated') {
            const res = fetch('http://localhost:3000/api/quiz_attempts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: `Bearer ${session?.user.accessToken}`
                },
                body: JSON.stringify({ q_id,t_id:session.user.t_id,c_id }),
            }).then(data => data.json()).then(data => {

                setStudents(data)
                setAuthenticated(true);
            })
        }
    }, [status])
    if (status == 'authenticated' && authenticated) {
        return (
            <div className="md:ml-[90px] mx-6 my-4 px-2 select-none">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="sm:text-3xl text-2xl font-medium mb-4">
                        Quiz Submissions
                    </h2>
                    <button
                        type="submit"
                        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-110 duration-300"
                        onClick={() => router.back()}
                    >
                        Go back
                    </button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-base text-gray-700 uppercase bg-gray-50 border-b-2 border-b-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Student ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Upload Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quiz Marks
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students?.map((student) => (
                                <tr
                                    key={student.s_id}
                                    className={
                                        (student.marks_obtained === 0
                                            ? `bg-red-600 text-white`
                                            : student.marks_obtained === 10
                                                ? `bg-green-500 text-white`
                                                : `bg-white even:bg-gray-100`) +
                                        ` text-gray-900 text-sm border-b`
                                    }
                                >
                                    <td className="px-6 py-4">{student.s_id}</td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        {student.s_name}
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        {student.uploadDate}
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium tracking-widest whitespace-nowrap"
                                    >
                                        {student.marks_obtained ? `${student.marks_obtained}/${student.total_marks}` : 'Not Attempted'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
