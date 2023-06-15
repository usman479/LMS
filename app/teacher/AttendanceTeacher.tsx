"use client";

import React, { useState } from "react";

interface Student {
  id: string;
  name: string;
}

export default function AttendanceTeacher({ course }: { course: string[] }) {
  return (
    <>
      <div className="px-2 select-none md:ml-[90px] mx-6 my-4">
        <h2 className="text-3xl font-medium mb-4">Attendance</h2>

        <form>
          <div className="my-6">
            <label
              htmlFor="at_date"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Date
            </label>
            <input
              type="date"
              id="at_date"
              name="at_date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="at_time"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Session time
            </label>
            <input
              type="time"
              id="at_time"
              name="at_time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
              placeholder=""
            />
          </div>

          <fieldset className="mb-6">
            <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
              Select a course for attendance
            </p>
            <legend className="sr-only">Checkbox variants</legend>
            {course.map((course, index) => (
              <ul className="w-auto text-sm font-medium text-gray-900 bg-white">
                <li
                  key={index}
                  className="w-full border-b border-gray-200 rounded-t-lg"
                >
                  <div className="flex items-center pl-3">
                    <input
                      id="list-radio-license"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="list-radio-license"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {course}
                    </label>
                  </div>
                </li>
              </ul>
            ))}
          </fieldset>
          <button
            type="submit"
            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-110 duration-300"
          >
            Mark attendance
          </button>
        </form>
      </div>
    </>
  );
}
