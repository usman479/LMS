import { formatDateTime } from '@/lib/dateFormatter'
import React from 'react'
import Link from "next/link";

type Props = {
    description: string,
    uploadDate: string,
    topic:string,
    file:string
}

export default function Material({ description, uploadDate,topic,file }: Props) {
    return (
        <li className="border-t-2 border-black my-2 py-4">
        <div className="sm:flex items-center justify-between border-2 bg-slate-100 pt-4 pb-10 px-5 my-1">
          <div className="flex basis-full sm:basis-1/2">
            <div className="select-none">
              <p className="text-xl sm:text-2xl font-medium mb-1.5">{topic}</p>
  
             {file && <Link
                href={file}
                target={'_blank'}
                className="hover:underline hover:text-gray-600 font-medium"
              >
                Download Lecture
              </Link>}
              <p>
                <span className="font-medium">Upload Date:</span>{" "}
                {formatDateTime(uploadDate)}{" "}
              </p>
            </div>
          </div>
        </div>
      </li>
    )
}
