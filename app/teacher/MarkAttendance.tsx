import React, { useState } from "react";
interface Student {
  id: string;
  name: string;
}

export default function MarkAttendance() {
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  let students: Student[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Sophia Anderson" },
    { id: "4", name: "James	Brown" },
    { id: "5", name: "Sarah	Walker" },
    { id: "6", name: "Mark Anderson" },
    { id: "7", name: "William Marcus" },
    { id: "8", name: "Mark Fellow" },
    { id: "9", name: "Gare Ferguson" },
    { id: "10", name: "Maurtitia Butt" },
  ];
  const handleStatusChange = (studentId: string, status: string) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: status,
    }));
  };
  const handleSelectAll = (selectAll: boolean, caller: string) => {
    const updatedAttendance: Record<string, string> = {};

    students.forEach((student) => {
      updatedAttendance[student.id] = caller === "P" ? "present" : "absent";
    });

    setAttendance(updatedAttendance);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:ml-[90px] mx-6 my-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 border-b-2 border-b-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Student ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3 flex">
              <input
                type="radio"
                name="status"
                onChange={(e) => handleSelectAll(e.target.checked, "P")}
              />
              <label className="ml-1.5 mr-3.5" htmlFor={"ca"}>
                P
              </label>
              <input
                type="radio"
                name="status"
                onChange={(e) => handleSelectAll(e.target.checked, "A")}
              />
              <label className="mx-1.5" htmlFor={"ca"}>
                A
              </label>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="text-sm border-b bg-white even:bg-gray-100"
            >
              <td className="px-6 py-4">{student.id}</td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {student.name}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`status_${student.id}`}
                    value="present"
                    checked={attendance[student.id] === "present"}
                    className="mr-2"
                    onChange={() => handleStatusChange(student.id, "present")}
                  />
                  <label
                    htmlFor={`status_${student.id}`}
                    className="mr-4"
                  ></label>
                  <input
                    type="radio"
                    name={`status_${student.id}`}
                    value="absent"
                    checked={attendance[student.id] === "absent"}
                    className="mr-2"
                    onChange={() => handleStatusChange(student.id, "absent")}
                  />
                  <label htmlFor={`status_${student.id}`}></label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="submit"
        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center float-right my-4 mx-10 hover:scale-110 duration-300"
      >
        Submit attendance
      </button>
    </div>
  );
}
