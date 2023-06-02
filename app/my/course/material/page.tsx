import Link from "next/link";
import React from "react";

export default function LectureSlide() {
  let lectures: number[] = [1, 2, 3];
  return (
    <>
      <div className="px-2">
        <h2 className="text-3xl font-medium">Lectures</h2>
        <ul>
          {lectures.map((lectures, index) => (
            <li className="b border-t-2 border-black my-2 py-4">
              <div className="sm:flex items-center justify-between border-2 bg-slate-100 pt-4 pb-10 px-5 my-1">
                <div className="flex basis-full sm:basis-1/2">
                  <div className="flex items-center justify-center h-full">
                    <div className={`bg-black w-20 h-20 rounded-md`}></div>
                  </div>
                  <span className="ml-4">
                    <p className="text-base sm:text-2xl">
                      Lecture no {lectures}
                    </p>
                    <Link
                      href=""
                      className="hover:underline hover:text-gray-600"
                    >
                      Download Lecture
                    </Link>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
