import React from "react";
import QuizComponent from "./components/QuizComponent";

export default function Quiz() {
  let quiz: number[] = [1, 2, 3];
  return (
    <>
      <div className="px-2">
        <h2 className="text-3xl font-medium">Quizzes</h2>
        <ul>
          {quiz.map((quiz, index) => (
            <QuizComponent quiz={quiz} key={index} />
          ))}
        </ul>
      </div>
    </>
  );
}
