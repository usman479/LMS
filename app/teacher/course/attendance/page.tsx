"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Student {
    id: string;
    name: string;
}

export default function AttendanceTeacher(

) {

    const router = useRouter();
    const [uploading,setUploading] = useState(false);
    const searchParams = useSearchParams();
    const {course_id} = {course_id:searchParams.get('course_id')};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);
        let time = e.target.at_time.value;
        let date = e.target.at_date.value;
        const res = await fetch('http://localhost:3000/api/add_session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
            },
            body: JSON.stringify({
                date: `${date} ${time}:00`
            })
        })
        
        let { a_id } = await res.json();
        router.push(`/teacher/mark_attendance?a_id=${a_id}&c_id=${course_id}`);
        setUploading(false);
    }

    return (
        <>
            <div className="select-none mx-6 my-4">
                <h2 className="text-3xl font-medium mb-4">Attendance</h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="my-6">
                        <label
                            htmlFor="at_date"
                            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            id="at_date"
                            name="at_date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="at_time"
                            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                        >
                            Session time
                        </label>
                        <input
                            type="time"
                            id="at_time"
                            name="at_time"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                            placeholder=""
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-110 duration-300"
                    >
                        Mark attendance
                    </button>
                </form>
            </div>
        </>
    );
}
