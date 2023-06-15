'use client'
import Link from "next/link";
import React, { useState, useRef } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDateTime } from "@/lib/dateFormatter";

type Props = {
    assignment: {
        assignment_id: number,
        assignment_description: string,
        course_name: string,
        due_date: string,
        teacher_name: string,
        upload_date: string,
        at_topic:string
    }
}

interface FormValues {
// Define the fields of your form and their respective types
updatedDate: string;
// ...
}

export default function AssignmentComponent({ assignment }: Props) {
    const [click, clickResult] = useState(false);
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
    // const { toast } = useToast();
    //   let uploadDate: Date = new Date(2023, 5, 18); // May 18, 2023
    //   let dueDate: Date = new Date(2023, 5, 25); // May 18, 2023
    formatDateTime(assignment.due_date)
    console.log()
    return (
        <>
            <Tooltip>
                <li className="border-t-2 border-black my-2 py-4">
                    <div className="sm:flex items-center justify-between border-2 bg-slate-100 pt-4 pb-10 px-5 my-1">
                        <div className="flex basis-full">
                            <div className="flex lg:flex-row flex-col justify-between select-none w-full">
                                <div className="basis-1/2">
                                    <p className="text-2xl font-medium">
                                        {assignment.at_topic || 'Assignment'}
                                    </p>
                                    <p className="text-sm lg:text-base mt-2">
                                        {assignment.assignment_description}
                                    </p>
                                </div>
                                <div className="my-2 lg:my-0">
                                    <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                                        <div className="flex items-center gap-x-2">
                                            {isUpdateOpen ? (
                                                <div className="px-1 py-2 text-center">
                                                <form
                                                    action=""
                                                    ref={formRef}
                                                    onSubmit={handleSubmit}
                                                >
                                                    <div>
                                                    <label
                                                        htmlFor="dueDate"
                                                        className="text-left block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Update Due Date
                                                    </label>
                                                    <input
                                                        type="datetime-local"
                                                        id="dueDate"
                                                        name="dueDate"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                                                        placeholder=""
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 text-center lg:ml-[19.5rem] -ml-[8rem]"
                                                    >
                                                        Update
                                                    </button>
                                                    </div>
                                                </form>
                                                </div>
                                            ) : (
                                                <>
                                                <button
                                                    type="button"
                                                    className="text-white bg-gray-800 w-28 hover:bg-gray-900 font-medium rounded-lg text-sm hover:scale-110 hover:duration-200 px-5 py-2 my-2 lg:float-right"
                                                >
                                                    <TooltipTrigger>
                                                        Due Date
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" align="start" className="text-xs lg:text-sm">
                                                        Upload: {formatDateTime(assignment.upload_date)} <br />
                                                        Due:  {formatDateTime(assignment.due_date)}
                                                    </TooltipContent>
                                                </button>
                                                <button onClick={handleOpenUpdate}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-8 h-8"
                                                    >
                                                        <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                        />
                                                    </svg>
                                                </button>
                                                </>
                                            )}
                                        </div>
                                        <p className="hover:underline hover:text-gray-600 ">
                                            Download Assignment
                                        </p>
                                        <p
                                            className="hover:underline hover:text-gray-600"
                                            onClick={() => clickResult(!click)}
                                        >
                                            See Submissions
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            (click ? `opacity-100` : `hidden `) +
                                            ` my-2 opacity-0 transition-opacity duration-600 ease-in-out`
                                        }
                                    >
                                        <form action="">
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                htmlFor="user_avatar"
                                            >
                                                Upload file
                                            </label>
                                            <input
                                                className="block w-full text-sm text-gray-900 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                                aria-describedby="user_avatar_help"
                                                id="user_avatar"
                                                type="file"
                                            />
                                            <div
                                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                id="user_avatar_help"
                                            >
                                                Upload pdf/doc/jpeg/png
                                            </div>
                                            <button
                                                type="button"
                                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 my-2 lg:float-right"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </Tooltip>
        </>
    );
}