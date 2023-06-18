'use client'
import { TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";
import { formatDateTime } from "@/lib/dateFormatter";
// import { data } from "autoprefixer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useRef } from "react";
import { compareDate } from "@/lib/dateFormatter";

type Props = {
    q_id: number,
    q_topic: string,
    q_desc: string,
    q_upload_date: string,
    q_due_date: string,
    q_time: number,
    marks_obtained: number,
    total_marks: number,
    attempt: number | null

}

interface FormValues {
    // Define the fields of your form and their respective types
    updatedDate: string;
    // ...
}

export default function QuizComponent({ q_id, q_topic, q_desc, q_upload_date, q_due_date, q_time, total_marks, marks_obtained, attempt }: Props) {
    const searchParams = useSearchParams();
    const { course_id, teacher_id, student_id } = { course_id: searchParams.get('course_id'), teacher_id: searchParams.get('teacher_id'), student_id: searchParams.get('student_id') };
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    let formValues: FormValues;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formValues = Object.fromEntries(
                formData.entries()
            ) as unknown as FormValues;

            // Use form values as needed
            console.log(formValues);
            closeUpdate();
        }
    };
    const handleOpenUpdate = () => {
        setIsUpdateOpen(true);
    };
    const closeUpdate = () => {
        setIsUpdateOpen(false);
    };

    return (
        <>

            <li className="border-t-2 border-black my-2 py-4">
                <div className="sm:flex items-center justify-between border-2 bg-slate-100 pt-4 pb-10 px-5 my-1">
                    <div className="flex basis-full">
                        <div className="select-none w-full">
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                                <div className="">
                                    <p className="text-2xl font-medium">{q_topic}</p>
                                    <p className="text-sm lg:text-base mt-2">
                                        {q_desc}
                                    </p>
                                </div>
                                <div className="flex items-center gap-x-2 self-start order-last mt-2 lg:mt-0">



                                    <>
                                        <Tooltip>
                                            <button
                                                type="button"
                                                className="text-white bg-gray-800 w-28 hover:bg-gray-900 font-medium rounded-lg text-sm hover:scale-110 hover:duration-200 px-4 py-2 my-2 lg:float-right flex-shrink-0 h-10"
                                            >
                                                <TooltipTrigger>
                                                    Due Date
                                                </TooltipTrigger>
                                                <TooltipContent side="top" align="start" className="text-xs lg:text-sm">
                                                    Upload: {formatDateTime(q_upload_date)} <br />
                                                    Due:  {formatDateTime(q_due_date)}
                                                </TooltipContent>
                                            </button>
                                        </Tooltip>

                                    </>

                                </div>
                            </div>

                            <div className="mt-2 flex justify-between flex-wrap">
                                {compareDate(q_due_date) ? <><span className="cursor-not-allowed">Quiz Closed</span><p className="">{`Duration: ${q_time}mins`}</p></> : !attempt ?
                                    <>
                                        <Link
                                            href={{ pathname: "/my/attempt", query: { course_id, q_id, student_id } }
                                            }
                                            className="hover:underline hover:text-gray-600 font-medium flex items-center"
                                        >
                                            Go to Quiz
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5 ml-2 transition-transform transform-gpu hover:translate-x-1 hover:duration-200"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                />
                                            </svg>
                                        </Link>
                                        <p className="">{`Duration: ${q_time}mins`}</p>
                                    </>
                                    :
                                    <>
                                        <span className="text-green-600">Attempted✔</span >
                                        <p className="text-lg">{`Score: ${marks_obtained}/${total_marks}`}</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </li>

        </>
    );
}
