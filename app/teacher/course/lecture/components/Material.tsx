import { formatDateTime } from '@/lib/dateFormatter'
import React from 'react'

type Props = {
    description: string,
    uploadDate: string
}

export default function Material({ description, uploadDate }: Props) {
    return (
        <li className="b border-t-2 border-black my-2 py-4">
            <div className="sm:flex items-center justify-between border-2 bg-slate-100 pt-4 pb-10 px-5 my-1 w-full">
                <div className="flex basis-full justify-between flex-wrap">
                    <div className='flex'>

                        <div className="flex items-center justify-center h-full">
                            <div className={`bg-black w-20 h-20 rounded-md`}></div>
                        </div>
                        <span className="ml-4 flex justify-between">
                            {/* <div className='flex justify-between w-full'> */}
                            <p className=" text-2xl">
                                {description}
                            </p>
                        </span>
                    </div>
                    <p className=' flex-shrink-0 text-sm ml-auto'>{formatDateTime(uploadDate)}</p>
                    {/* </div> */}
                    {/* <Link
                            href=""
                            className="hover:underline hover:text-gray-600"
                        > */}
                    {/* Download Lecture */}
                    {/* </Link> */}
                </div>
            </div>
        </li>
    )
}
