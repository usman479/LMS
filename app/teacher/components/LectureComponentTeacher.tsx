import React, { useState } from "react";
import TeacherFormComponent from "./TeacherFormComponent";

type CourseType = {
  course_id: string,
  course_name: string,
  t_id: string,
  semester_num: string,
  section: string
};


export default function LectureComponentTeacher({
  courses,
}: {
  courses: CourseType[];
}) {

  return (
    <div className="px-2">
      <h2 className="text-3xl font-medium">Lectures</h2>
      {/* <button
        onClick={() => {
          handleToggleForm();
        }}
        className="mt-3 mb-6 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        id="mainForm"
      >
        Upload Lecture
      </button> */}
      <div>
        <TeacherFormComponent courses={courses} caller="lecture" />
      </div>
    </div>
  );
}
