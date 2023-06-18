'use client'
import React, { useEffect, useState } from "react";
import Quizzes from './components/Quizzes'
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
  attempt:number|null,
  marks_obtained:number,
  total_marks:number
}

export default function Quiz() {
  // let quiz: number[] = [1, 2, 3];
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const { course_id, student_id } = { course_id: searchParams.get('course_id'), student_id: searchParams.get('student_id') };
  const [quizzes, setQuizzes] = useState<QuizType[]>();
  useEffect(() => {
    console.log('saad: ', status);
    if (status === 'authenticated') {
      console.log('saad: ', status);
      fetch(`http://localhost:3000/api/quiz?course_id=${course_id}&student_id=${student_id}`, {
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
                  return <Quizzes key={quiz.q_id} q_id={quiz.q_id} q_topic={quiz.q_topic} q_desc={quiz.q_desc} q_upload_date={quiz.q_upload_date} q_due_date={quiz.q_due_date} q_time={quiz.q_time} marks_obtained={quiz.marks_obtained} total_marks={quiz.total_marks} attempt={quiz.attempt}/>
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
