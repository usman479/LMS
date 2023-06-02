// import React from "react";
// import Navigation from "./Navigation";
// import CourseComponent from "./CourseComponent";

// export const Studentpage = () => {
//   const name = "Saad Nisar Butt";
//   const c1_val = "50";
//   const courses: String[] = [
//     "Database Systems Lab",
//     "Database Systems",
//     "Design and Analysis of Algorithms",
//     "Foreign Langauage",
//     "Theory of Automata and Formal Lanaguages",
//   ];
//   return (
//     <>
//       <div className="ml-[90px] mr-10">
//         <div className="my-4 p-4 bg-white border-2 shadow-md h-52 flex flex-col sm:flex-row items-start">
//           <img
//             src="https://lms.dsu.edu.pk/pluginfile.php/94497/user/icon/moove/f1?rev=3003270"
//             className="w-28 h-28 rounded-full"
//             alt="profile_picture"
//           />
//           <p className="text-3xl sm:text-4xl sm:ml-4 font-medium tracking-normal leading-relaxed">
//             {name}
//           </p>
//         </div>
//         <div className="border-t-2 border-black">
//           <p className="p-3 text-lg">Course Overview</p>
//           {courses.map((courses, index) => (
//             <CourseComponent
//               key={index}
//               course_name={courses}
//               course_value={c1_val}
//               color={index % 2 == 0 ? "bg-gray-600" : "bg-gray-400"}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
