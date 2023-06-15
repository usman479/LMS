"use client";

import Link from "next/link";
import AnnouncementTeacher from "./AnnouncementTeacher";
import LectureComponentTeacher from "./LectureComponentTeacher";
import AssignmentTeacher from "./AssignmentTeacher";
import QuizTeacher from "./QuizTeacher";
import { useState } from "react";

export default function TeacherUploadPage({ courses }: { courses: string[] }) {
  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  return (
    <>
      <div className="md:ml-[90px] mx-6">
        <div className="border-2 border-t-2 mt-6 p-2 flex flex-wrap">
          <Link href={"/"} className="flex flex-grow">
            <button
              className={`py-2 px-3 rounded-md shadow-lg m-4 text-center flex-grow ${
                (activeButton || "button1") === "button1"
                  ? "bg-black text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => handleButtonClick("button1")}
            >
              Lecture Slides
            </button>
          </Link>
          <Link href={"/"} className="flex flex-grow">
            <button
              className={`py-2 px-3 rounded-md shadow-lg m-4 text-center flex-grow ${
                activeButton === "button3"
                  ? "bg-black text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => handleButtonClick("button3")}
            >
              Assignment
            </button>
          </Link>
          <Link href={"/"} className="flex flex-grow">
            <button
              className={`py-2 px-3 rounded-md shadow-lg m-4 text-center flex-grow ${
                activeButton === "button4"
                  ? "bg-black text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => handleButtonClick("button4")}
            >
              Quiz
            </button>
          </Link>
          <Link href={"/"} className="flex flex-grow">
            <button
              className={`py-2 px-3 rounded-md shadow-lg m-4 text-center flex-grow ${
                activeButton === "button5"
                  ? "bg-black text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => handleButtonClick("button5")}
            >
              Announcements
            </button>
          </Link>
        </div>
        <div className="border-2 h-full mt-4 duration-500 p-4">
          {activeButton === "button3" ? (
            <AssignmentTeacher course={courses} />
          ) : activeButton === "button4" ? (
            <QuizTeacher course={courses} />
          ) : activeButton === "button5" ? (
            <AnnouncementTeacher course={courses} />
          ) : (
            <LectureComponentTeacher course={courses} />
          )}
        </div>
      </div>
    </>
  );
}
