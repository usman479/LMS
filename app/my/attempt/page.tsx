"use client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type QuestionType = {
  question: string,
  ques_opt_A: string,
  ques_opt_B: string,
  ques_opt_C: string,
  ques_opt_D: string,
  ques_correct_opt: string,
  q_id: string
}

let answers: string[] = [];

export default function QuizPage() {
  const router = useRouter();
  // const questions = [
  //   {
  //     question: "What is linear transformation?",
  //     opt: [
  //       "A function that maps vectors from one vector space to another while preserving vector addition and scalar multiplication.",
  //       "A function that maps vectors from one vector space to another, but it does not preserve vector addition and scalar multiplication.",
  //       "A function that maps vectors only within the same vector space.",
  //       "A function that maps vectors from one vector space to another by applying non-linear operations.",
  //     ],
  //     correctOpt: [
  //       "A function that maps vectors from one vector space to another while preserving vector addition and scalar multiplication.",
  //     ],
  //   },
  //   {
  //     question: "Which of the following operations are valid for matrices?",
  //     opt: [
  //       "Matrix addition",
  //       "Matrix division",
  //       "Matrix exponentiation",
  //       "Matrix multiplication",
  //     ],
  //     correctOpt: ["Matrix addition", "Matrix multiplication"],
  //   },
  //   {
  //     question:
  //       "Which of the following operations are valid in Linear Algebra?",
  //     opt: [
  //       "Multiplying a vector by a scalar.",
  //       "Taking the derivative of a matrix",
  //       "Finding the maximum value in a vector",
  //       "Converting a matrix to a string",
  //     ],
  //     correctOpt: ["Multiplying a vector by a scalar"],
  //   },
  // ];

  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const { course_id, q_id, student_id, } = { course_id: searchParams.get('course_id'), q_id: searchParams.get('q_id'), student_id: searchParams.get('student_id') };
  const [questions, setQuestions] = useState<QuestionType[]>();
  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`http://localhost:3000/api/questions?course_id=${course_id}&student_id=${student_id}&q_id=${q_id}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${session.user.accessToken}`
        }
      }).then(res => res.json()).then(data => { setQuestions(prev => data); setTime(prev => data[0].q_time * 60) })
    }
  }, [status])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimeUp, setTimeUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  let result = 0;
  // Timer for Quiz
  let duration = 1 * 60;
  const [time, setTime] = useState(duration);

  useEffect(() => {
    // Timer will reduced every second
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // time's up so modal will be shown
    if (time === 0) {
      setTimeUp(true);
      clearInterval(timer);
      return;
    }

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const handleNextQuestion = () => {
    console.log('answer: ', answers)
    // @ts-ignore
    let radios = document.getElementsByName('option');
    radios.forEach(opt => {
      // @ts-ignore
      opt.checked = false;
    })
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const calculateResult = () => {
    for (let i = 0; i < answers.length; i++) {
      // @ts-ignore
      if (answers[i] == questions[i].ques_correct_opt) {
        ++result;
      }
    }
  }

  const handlePrevQuestion = () => {
    console.log('answer: ', answers)
    // @ts-ignore
    let radios = document.getElementsByName('option');
    radios.forEach(opt => {
      // @ts-ignore
      opt.checked = false;
    })
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  // Quiz interface will disappear
  const handleTimeUp = () => {
    setQuizDone(!quizDone);
    setTimeUp(false);
  };

  // Time formatter in minutes:seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  let showTime: string = formatTime(time);

  // Modal Handlers when user submits the quiz
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmitQuiz = () => {
    calculateResult();
    setSubmitting(prev => true)
    console.log('total: ', questions?.length + 'score: ', result,)
    fetch('http://localhost:3000/api/quiz', {
      method: 'POST',
      headers: {
        // @ts-ignore
        authorization: `Bearer ${session.user.accessToken}`
      },
      body: JSON.stringify({ s_id: student_id, q_id, attempt: true, marks_obtained: result, total_marks: questions?.length })
    }).then(res => setSubmitting(prev => false)).then(data => router.push('/my'));
    setQuizDone(!quizDone);
    closeModal();
    setTime(-1);
  };
  if (status === 'authenticated' && questions !== undefined) {



    return (
      <>
        <div className={`md:ml-[80px] m-4 px-2`}>
          <div
            className={
              (isModalOpen || isTimeUp
                ? `opacity-50 pointer-events-none`
                : `opacity-100`) + ` flex items-center justify-between`
            }
          >
            <h1 className="text-3xl my-2 sm:text-4xl md:ml-4 font-medium tracking-normal leading-relaxed select-none">
              Course
            </h1>
            <button
              type="button"
              className={`bg-gray-900 hover:bg-gray-900 hover:scale-110 hover:duration-200 text-white w-24 font-medium rounded-lg text-sm px-4 py-2 mx-2`}
            >
              <div role="status" className={submitting ? "block" : "hidden"}>
                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              {!submitting ? "Go back" : ' '}
            </button>
          </div>
          <div
            className={
              (quizDone ? ` hidden ` : ` block `) +
              (isModalOpen || isTimeUp
                ? ` opacity-50 pointer-events-none `
                : ` opacity-100 `) +
              `md:ml-4 my-3 p-6 border-2 border-t-2 border-t-black shadow-md`
            }
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl sm:text-3xl my-2 font-medium tracking-normal leading-relaxed select-none">
                Q: {currentQuestionIndex + 1}
              </h3>
              <div>
                <span className="font-medium text-lg">Timer:</span> {showTime}
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                {questions[currentQuestionIndex].question}
              </h3>
              <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {/* {questions[currentQuestionIndex].opt.map((opt, index) => ( */}
                <li
                  // key={index}
                  className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                >
                  <div className="flex items-center pl-3">
                    <input
                      id="vue-checkbox"
                      type="radio"
                      name='option'
                      value="0"
                      onChange={e => {answers[currentQuestionIndex] = e.target.value;}}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {questions[currentQuestionIndex].ques_opt_A}
                    </label>
                  </div>
                </li>

                <li
                  // key={index}
                  className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                >
                  <div className="flex items-center pl-3">
                    <input
                      id="vue-checkbox"
                      type="radio"
                      name='option'
                      value="1"
                      onChange={e => {answers[currentQuestionIndex] = e.target.value;}}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {questions[currentQuestionIndex].ques_opt_B}
                    </label>
                  </div>
                </li>

                <li
                  // key={index}
                  className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                >
                  <div className="flex items-center pl-3">
                    <input
                      id="vue-checkbox"
                      type="radio"
                      name='option'
                      value="2"
                      onChange={e => {answers[currentQuestionIndex] = e.target.value;}}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {questions[currentQuestionIndex].ques_opt_C}
                    </label>
                  </div>
                </li>

                <li
                  // key={index}
                  className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                >
                  <div className="flex items-center pl-3">
                    <input
                      id="vue-checkbox"
                      type="radio"
                      name='option'
                      value="3"
                      onChange={e => {answers[currentQuestionIndex] = e.target.value;}}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {questions[currentQuestionIndex].ques_opt_D}
                    </label>
                  </div>
                </li>
                {/* ))} */}
              </ul>
            </div>
          </div>
          <div
            className={
              (quizDone ? ` hidden ` : ` block `) + `flex justify-end mt-4`
            }
          >
            <button
              type="button"
              className={
                (currentQuestionIndex !== 0
                  ? ` bg-gray-900 hover:bg-gray-900 hover:scale-110 hover:duration-200 `
                  : ` bg-gray-400 cursor-not-allowed `) +
                (isModalOpen || isTimeUp
                  ? ` opacity-50 pointer-events-none `
                  : ` opacity-100 `) +
                `text-white w-24 font-medium rounded-lg text-sm px-4 py-2 mx-2`
              }
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>
            <button
              type="button"
              className={
                (currentQuestionIndex !== questions.length - 1
                  ? `bg-gray-900 hover:bg-gray-900 hover:scale-110 hover:duration-200`
                  : `bg-gray-400 cursor-not-allowed hidden`) +
                (isTimeUp
                  ? ` opacity-50 pointer-events-none `
                  : ` opacity-100 `) +
                ` text-white w-24 font-medium rounded-lg text-sm px-4 py-2 mx-2`
              }
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <div>
                <button
                  onClick={handleOpenModal}
                  className={
                    (isModalOpen || isTimeUp
                      ? ` opacity-50 pointer-events-none `
                      : ` opacity-100 `) +
                    `bg-gray-900 hover:bg-gray-900 hover:scale-110 hover:duration-200 text-white w-24 font-medium rounded-lg text-sm px-4 py-2 mx-2`
                  }
                >
                  Submit
                </button>
                {isModalOpen && (
                  <div
                    id="popup-modal"
                    className={`flex items-center justify-center fixed top-0 left-[10%] right-[10%] lg:left-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
                  >
                    <div className="relative w-full max-w-md max-h-full">
                      <div className="relative bg-white border-2 border-gray-300 rounded-lg shadow dark:bg-gray-700">
                        <div className="p-6 text-center">
                          <svg
                            aria-hidden="true"
                            className="mx-auto lg:mb-4 mb-2 text-gray-400 lg:w-14 lg:h-14 w-8 h-8 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <h3 className="lg:mb-5 mb-2 lg:text-lg text-sm font-normal text-gray-500 dark:text-gray-400">
                            Are you sure to submit the quiz?
                          </h3>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg lg:text-sm text-xs inline-flex items-center lg:px-5 lg:py-2.5 px-3 py-1.5 text-center mr-2"
                            onClick={handleSubmitQuiz}
                          >
                            Yes, I'm sure
                          </button>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 lg:text-sm text-xs font-medium lg:px-5 lg:py-2.5 px-3 py-1.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={closeModal}
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {isTimeUp && (
          <div
            id="popup-modal"
            className="flex items-center justify-center fixed top-0 left-[10%] right-[10%] lg:left-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white border-2 border-gray-300 rounded-lg shadow dark:bg-gray-700">
                <div className="lg:p-6 px-8 py-4 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto lg:mb-4 mb-2 text-gray-400 lg:w-14 lg:h-14 w-8 h-8 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="lg:mb-5 mb-2 lg:text-lg text-sm font-normal text-gray-500 dark:text-gray-400">
                    Quiz time out reached!
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg lg:text-sm text-xs inline-flex items-center lg:px-5 lg:py-2.5 px-3 py-1.5 text-center mr-2"
                    onClick={handleTimeUp}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
