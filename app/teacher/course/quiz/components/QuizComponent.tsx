'use client'
import { TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";
import { formatDateTime } from "@/lib/dateFormatter";
// import { data } from "autoprefixer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useRef } from "react";

type Props = {
  q_id: number,
  q_topic: string,
  q_desc: string,
  q_upload_date: string,
  q_due_date: string,
  q_time: number,

}

interface FormValues {
  // Define the fields of your form and their respective types
  updatedDate: string;
  // ...
}

export default function QuizComponent({ q_id, q_topic, q_desc, q_upload_date, q_due_date, q_time,}: Props) {
  const searchParams = useSearchParams();
  const { course_id, teacher_id, student_id } = { course_id: searchParams.get('course_id'), teacher_id: searchParams.get('teacher_id'), student_id: searchParams.get('student_id') };
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updatedDate,setUpdatedDate] = useState<string>(q_due_date);
  const formRef = useRef<HTMLFormElement>(null);
  let formValues: FormValues;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      formValues = Object.fromEntries(
        formData.entries()
      ) as unknown as FormValues;

      const res = await fetch('http://localhost:3000/api/update_quiz',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body:JSON.stringify({
            due_date:formValues.dueDate,
            q_id,
        })
    })

    const data = await res.json();
      // Use form values as needed
      console.log(formValues);
      q_due_date = data.q_due_date
      setUpdatedDate(q_due_date);
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
                    {isUpdateOpen ?
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
                    :
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
                            Due:  {formatDateTime(updatedDate)}
                          </TooltipContent>
                        </button>
                        </Tooltip>
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
                    }
                  </div>
                </div>

                <div className="mt-2">
                  {
                    <Link
                      href={{ pathname: '/teacher/attempts', query: { q_id,c_id:course_id } }}
                      className="hover:underline hover:text-gray-600 font-medium flex items-center"
                    >
                     See Attempts
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 ml-2 transition-transform transform-gpu hover:translate-x-1 hover:duration-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </li>
      
    </>
  );
}
