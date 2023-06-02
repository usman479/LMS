import Link from "next/link";

export default function QuizComponent({ quiz }: { quiz: number }) {
  return (
    <>
      <li className="border-t-2 border-black my-2 py-4">
        <div className="sm:flex items-center justify-between border-2 bg-slate-100 pt-4 pb-10 px-5 my-1">
          <div className="flex basis-full">
            <div className="select-none">
              <div className="">
                <p className="text-2xl font-medium">Quiz no. {quiz}</p>
                <p className="text-sm lg:text-base mt-2">
                  Assignment Description Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Accusantium ipsa praesentium, eligendi
                  impedit maxime ipsam minus, incidunt inventore soluta dolores
                  ea reprehenderit id! Saepe eaque quisquam aspernatur.
                </p>
              </div>
              <div className="mt-2">
                <Link
                  href="/"
                  className="hover:underline hover:text-gray-600 font-medium flex items-center"
                >
                  Go to Quiz
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 ml-2 transition-transform transform-gpu hover:translate-x-1 hover:duration-200"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
