// Assignment.tsx 
'use client'
import Link from "next/link";
import React, { useState } from "react";

export default function Assignment() {
  let assignments: number[] = [1, 2, 3];
  const [click, clickResult] = useState(false);
  return (
    <>
      <div>
        <h2 className="text-3xl font-medium">Assignements</h2>
        <ul>
          {assignments.map((index, assignments) => (
            <li className="b border-t-2 border-black my-2 py-4">
              <div className="sm:flex items-center justify-between border-2 bg-slate-100 pt-4 pb-10 px-5 my-1">
                <div className="flex basis-full sm:basis-1/2">
                  {/* <span className={color + ` w-20 h-20 rounded-full inline-block`}></span> */}
                  <div className="flex items-center justify-center h-full">
                    <div className={`bg-black w-20 h-20 rounded-md`}></div>
                  </div>
                  <span className="ml-4">
                    <p className="text-base sm:text-2xl">
                      Assignment no {assignments + 1}
                    </p>
                    <div className="flex flex-col">
                      <Link
                        href="/"
                        className="hover:underline hover:text-gray-600"
                      >
                        Download Assignment
                      </Link>
                      <Link
                        href="/"
                        className="hover:underline hover:text-gray-600"
                        onClick={() => clickResult(!click)}
                      >
                        Submit Assignment
                      </Link>
                      {/* <div
                        className={(click ? `opacity-100` : `hidden `) + ` my-2 opacity-0 transition-opacity duration-600 ease-in-out`}
                        id="my-element"
                      >
                        <form action="">
                          <input
                            type="file"
                            name="assignment_submission"
                            className="py-1.5 px-2 border-2 border-gray-400 bg-gray-300 mr-2 mb-2 sm:mb-0 rounded-sm"
                            id=""
                          />
                          <button className="py-2 px-6 border-2 border-gray-400 bg-gray-300 mr-2 mb-2 sm:mb-0 rounded-sm">
                            Submit
                          </button>
                        </form>
                      </div> */}
                    </div>
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
