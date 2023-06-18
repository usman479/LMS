'use client'
import React, { useEffect, useState } from "react";
import QuizComponent from "./components/QuizComponent";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

type QuizType = {
  q_id: number,
  q_topic: string,
  q_desc: string,
  q_upload_date: string,
  q_due_date: string,
  q_time: number,
}

export default function Quiz() {
  // let quiz: number[] = [1, 2, 3];
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const { course_id, teacher_id } = { course_id: searchParams.get('course_id'), teacher_id: searchParams.get('teacher_id') };
  const [quizzes, setQuizzes] = useState<QuizType[]>();
  useEffect(() => {
    console.log('saad: ', status);
    if (status === 'authenticated') {
      console.log('saad: ', status);
      fetch(`http://localhost:3000/api/teacher_quizzes?course_id=${course_id}&teacher_id=${teacher_id}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${session.user.accessToken}`
        }
      }).then(res => res.json()).then(data => { setQuizzes(prev => data); console.log(data) })
    }
  }, [status])
  if (status === 'authenticated' && quizzes !== undefined) {
    console.log('quizzes: ', quizzes)
    return (
      <>
        <div className="px-2">
          <h2 className="text-3xl font-medium">Quizzes</h2>
          <TooltipProvider delayDuration={100}>
            <ul>
              {typeof quizzes != 'string' && quizzes.length > 0 ?
                quizzes.map(quiz => {
                  return <QuizComponent key={quiz.q_id} q_id={quiz.q_id} q_topic={quiz.q_topic} q_desc={quiz.q_desc} q_upload_date={quiz.q_upload_date} q_due_date={quiz.q_due_date} q_time={quiz.q_time}/>
                })
                :
                'No Quiz!'
              }
            </ul>
          </TooltipProvider>
        </div>
      </>
    );
  }
}
