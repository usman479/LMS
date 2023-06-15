import { NextRequest,NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { query } from "@/lib/db";

export async function GET(req:NextRequest){
    // const {course_id} = await req.json();
    const {searchParams} = new URL(req.url);
    const course_id = searchParams.get('course_id');
    const teacher_id = searchParams.get('teacher_id');
    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    if(!course_id && !teacher_id){
        return NextResponse.json('Invalid parameters')
    }

    if(jwt.decode(accessToken!)?.t_id != teacher_id){
        return NextResponse.json('your are no eligible to access this page');
    }

    const res = await query({
        query: `select q_id,q_topic,q_desc,q_upload_date,q_due_date,q_time from quiz where c_id = ?;`,
        values: [course_id!]
    });

    // const result = await res.json();
    // console.log("yours: ", res)
    // console.log('haaan: ', res)
    return NextResponse.json(res);

}