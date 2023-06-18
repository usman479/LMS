'use client'
import Link from "next/link";
import React, { useState, useRef } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDateTime } from "@/lib/dateFormatter";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
    assignment: {
        assignment_id: number,
        assignment_description: string,
        course_name: string,
        due_date: string,
        teacher_name: string,
        upload_date: string,
        at_topic: string
        file: string
    }
}

interface FormValues {
    // Define the fields of your form and their respective types
    updatedDate: string;
    // ...
}

export default function AssignmentComponent({ assignment }: Props) {
    const { update } = useSession();
    const [click, clickResult] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const [updatedDate, setUpdatedDate] = useState<string>(assignment.due_date);
    const pathName = usePathname();
    const formRef = useRef<HTMLFormElement>(null);
    let formValues: FormValues;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formValues = Object.fromEntries(
                formData.entries()
            ) as unknown as FormValues;

            // Use form values as needed
            console.log(formValues.dueDate);
            const res = await fetch('http://localhost:3000/api/update_as', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    due_date: formValues.dueDate,
                    a_id: assignment.assignment_id,
                })
            })

            const data = await res.json();

            assignment = { ...assignment, due_date: data.at_due_date };
            // console.log(assignment.due_date)
            setUpdatedDate(assignment.due_date);
            closeUpdate();
        }
    };
    const handleOpenUpdate = () => {
        setIsUpdateOpen(prev => !prev);
    };
    const closeUpdate = () => {
        setIsUpdateOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3000/api/upload_ass?at_id=${assignment.assignment_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        closeModal();
        update();
    }


    // const { toast } = useToast();
    //   let uploadDate: Date = new Date(2023, 5, 18); // May 18, 2023
    //   let dueDate: Date = new Date(2023, 5, 25); // May 18, 2023
    // formatDateTime(assignment.due_date)
    // console.log()
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
                                    {/* <div>
                                        <button onClick={handleOpenModal} className="flex items-center gap-x-2 text-white bg-red-600 w-28 hover:bg-red-900 font-medium rounded-lg text-sm hover:scale-110 hover:duration-200 px-4 py-2 mt-2">
                                            Delete
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                        {isModalOpen && (
                                            <div
                                                id="popup-modal"
                                                className={`flex items-center justify-center fixed top-0 left-[10%] right-[10%] lg:left-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
                                            >
                                                <div className="relative w-full max-w-md max-h-full">
                                                    <div className="relative bg-white border-2 border-gray-300 rounded-lg shadow dark:bg-gray-700">
                                                        <div className="p-6 text-center">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="mx-auto lg:mb-4 mb-2 text-gray-400 lg:w-14 lg:h-14 w-8 h-8 dark:text-gray-200"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                ></path>
                                                            </svg>
                                                            <h3 className="lg:mb-5 mb-2 lg:text-lg text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                Are you sure you want to delete this assignment?
                                                            </h3>
                                                            <button
                                                                data-modal-hide="popup-modal"
                                                                type="button"
                                                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg lg:text-sm text-xs inline-flex items-center lg:px-5 lg:py-2.5 px-3 py-1.5 text-center mr-2"
                                                                // onClick={handleSubmitQuiz}
                                                                onClick={handleDelete}
                                                            >
                                                                Yes, I'm sure
                                                            </button>
                                                            <button
                                                                data-modal-hide="popup-modal"
                                                                type="button"
                                                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 lg:text-sm text-xs font-medium lg:px-5 lg:py-2.5 px-3 py-1.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                                onClick={closeModal}
                                                            >
                                                                No, cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div> */}
                                </div>
                                <div className="my-2 lg:my-0">
                                    <div className="flex flex-col lg:items-end">
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
                                                            <div className="flex items-center gap-x-2 lg:justify-end">

                                                                <button
                                                                    type="submit"
                                                                    className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 text-center"
                                                                >
                                                                    Update
                                                                </button>
                                                                <button onClick={handleOpenUpdate} className="mt-2.5">
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
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            ) : (
                                                <>
                                                    <button
                                                        className="text-white bg-gray-800 w-28 hover:bg-gray-900 font-medium rounded-lg text-sm hover:scale-110 hover:duration-200 px-5 py-2 my-2 lg:float-right"
                                                    >
                                                        <TooltipTrigger>
                                                            Due Date
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" align="start" className="text-xs lg:text-sm">
                                                            Upload: {formatDateTime(assignment.upload_date)} <br />
                                                            Due:  {formatDateTime(updatedDate)}
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
                                        {assignment.file && <Link href={assignment.file} target={'_blank'} className="hover:underline hover:text-gray-600 ">
                                            Download Assignment
                                        </Link >}
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
                                    <div className="lg:float-right float-none">
                                        <button onClick={handleOpenModal} className="flex items-center gap-x-2 text-white bg-red-600 w-28 hover:bg-red-900 font-medium rounded-lg text-sm hover:scale-110 hover:duration-200 px-4 py-2 mt-2">
                                            Delete
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                        {isModalOpen && (
                                            <div
                                                id="popup-modal"
                                                className={`flex items-center justify-center fixed top-0 left-[10%] right-[10%] lg:left-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
                                            >
                                                <div className="relative w-full max-w-md max-h-full">
                                                    <div className="relative bg-white border-2 border-gray-300 rounded-lg shadow dark:bg-gray-700">
                                                        <div className="p-6 text-center">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="mx-auto lg:mb-4 mb-2 text-gray-400 lg:w-14 lg:h-14 w-8 h-8 dark:text-gray-200"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                ></path>
                                                            </svg>
                                                            <h3 className="lg:mb-5 mb-2 lg:text-lg text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                Are you sure you want to delete this assignment?
                                                            </h3>
                                                            <button
                                                                data-modal-hide="popup-modal"
                                                                type="button"
                                                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg lg:text-sm text-xs inline-flex items-center lg:px-5 lg:py-2.5 px-3 py-1.5 text-center mr-2"
                                                                // onClick={handleSubmitQuiz}
                                                                onClick={handleDelete}
                                                            >
                                                                Yes, I'm sure
                                                            </button>
                                                            <button
                                                                data-modal-hide="popup-modal"
                                                                type="button"
                                                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 lg:text-sm text-xs font-medium lg:px-5 lg:py-2.5 px-3 py-1.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                                onClick={closeModal}
                                                            >
                                                                No, cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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