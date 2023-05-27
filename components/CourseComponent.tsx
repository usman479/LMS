import React from "react";

const Studentpage = ({ course_name,course_value, color }: { course_name:String, course_value: String, color:String }) => {
  return (
    <>
      <div className="flex items-center justify-between border-2 bg-slate-100 pt-4 pb-10 px-2 my-1">
        <div className="flex basis-1/2">
          <span className={color + ` sm:h-20 h-14 sm:w-20 w-14 rounded-full inline-block`}></span>
          <span className="ml-3">
            <p className="text-xs sm:text-sm">Computer Science</p>
            <p className="text-base sm:text-xl">{course_name} (BS-CS-4C)</p>
          </span>
        </div>

        <div className="sm:block hidden w-64 h-2 bg-gray-400 relative ml-0">
          <div
            className="h-full bg-black absolute top-0 left-0"
            style={{
              width: `${course_value}%`,
            }}
          ></div>
          <p className="text-xs pt-6">{course_value}% complete</p>
        </div>

        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg> */}
      </div>
    </>
  );
};

export default Studentpage;
