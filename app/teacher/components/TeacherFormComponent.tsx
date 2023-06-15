import { getTeacherCourses } from "@/lib/getData";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toDateTime } from "@/lib/dateFormatter";

type CourseType = {
  course_id: string,
  course_name: string,
  t_id: string,
  semester_num: string,
  section: string
};


export default function TeacherFormComponent({
  courses,
  caller,
}: {
  courses: CourseType[];
  caller: string;
}) {


  const { data: session, status } = useSession();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploading(true);
    let selectedCourse: string[] = []
    e.preventDefault();
    let topic = e.target.topic.value;
    let desc = e.target.desc.value;
    let dueDate = e.target.dueDate.value;
    let link = e.target.link.value;
    console.log(toDateTime(dueDate) );
    courses.forEach((course: CourseType) => {
      let val = 'c' + course.course_id;
      if (e.target[val].checked) {
        selectedCourse.push(e.target[val].value);
      }
    })
    if(caller === 'lecture'){
      const res = await fetch("http://localhost:3000/api/upload_lec", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
        },
      body: JSON.stringify({
        topic,
        desc,
        selectedCourse
      })
    })
  }

  if(caller === 'assignment'){
    const res = await fetch("http://localhost:3000/api/upload_ass", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
    body: JSON.stringify({
      topic,
      dueDate,
      desc,
      selectedCourse
    })
  })
  }

  if(caller === 'announcement'){
    const res = await fetch("http://localhost:3000/api/upload_an", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
    body: JSON.stringify({
      topic,
      link,
      desc,
      selectedCourse
    })
  })
  }
    
    setUploading(false);
    
  }

  if (status === "authenticated") {
    return (
      <form onSubmit={e => handleSubmit(e)}>
        <div className="my-6">
          <label
            htmlFor="topic"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
            placeholder=""
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="desc"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500"
            placeholder=""
          ></textarea>
        </div>
        <div className={(caller === "quiz" ? `hidden ` : `block `) + `mb-6`}>
          <label
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Any file
          </label>
          <input
            className="block p-2.5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          />
        </div>
        <div
          className={(caller === "announcement" ? `block ` : `hidden `) + `mb-6`}
        >
          <label
            htmlFor="link"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Any link
          </label>
          <input
            type="url"
            id="link"
            name="link"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
            placeholder=""
          />
        </div>
        <div
          className={(caller === "lecture" || caller === 'announcement' ? `hidden ` : `block `) + `mb-6`}
        >
          <label
            htmlFor="dueDate"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Due Date
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
            placeholder=""
          />
        </div>
        {/* <div className="my-6">
          <label
            htmlFor="totalTime"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            id="totalTime"
            name="totalTime"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
            placeholder=""
            required
          />
        </div> */}
        <fieldset>
          <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
            Select courses for the {caller}
          </p>
          <legend className="sr-only">Checkbox variants</legend>
          {courses.map((course: CourseType, index) => (
            <div className="flex items-center mb-4" key={index}>
              <input
                id={`checkbox-${index}`}
                type="checkbox"
                name={'c' + course.course_id}
                value={course.course_id}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor={`checkbox-${index}`}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {`${course.course_name} (${course.semester_num}${course.section})`}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                ></a>
              </label>
            </div>
          ))
  }
        </fieldset>
        <button
          type="submit"
          className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {uploading ? 
            <svg
              aria-hidden="true"
              className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            :
            "Upload"
          }
        </button>
      </form>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
