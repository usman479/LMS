import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import jwt from 'jsonwebtoken'

type Props = {
    params:{
        teacher_id:string,
        course_id:string
        student_id:string
    }
}

export async function GET(req: NextRequest) {
    // const { t_id, c_id } = params;
    const accessToken = req.headers.get('authorization')?.split(' ')[1];
    // console.log("tok: ", accessToken)
    const {searchParams} = new URL(req.url);
    const t = searchParams.get('teacher_id')
    const c = searchParams.get('course_id')
    const s = searchParams.get('student_id')

    // console.log('Now: ', c,t,s,jwt.decode(accessToken!).s_id)
    if(!t && !c && !s){
        return NextResponse.json('Invalid parameters')
    }
    // console.log('st_id: ', jwt.decode(accessToken!)?.s_id);
    // console.log("kese: ", jwt.decode(accessToken!)?.s_id, s, typeof s,typeof jwt.decode(accessToken!)?.s_id)
    // @ts-ignore
    if(jwt.decode(accessToken!)?.s_id != s){
        return NextResponse.json('your are no eligible to access this page');
    }

    const res = await query({
        query: `select q.q_id,q_topic,q_desc,q_upload_date,q_due_date,q_time, qa.attempt,qa.marks_obtained,qa.total_marks from quiz q
        left join quiz_attempt qa on qa.q_id = q.q_id and qa.s_id = ?
        where q.c_id in (
            select c_id from enroll_assign where s_id = ?
        ); `,
        values: [s!,s!]
    });

    // const result = await res.json();
    // console.log("yours: ", res)
    console.log('haaan: ', res)
    return NextResponse.json(res);
}




export async function POST(req: NextRequest) {
    const { s_id,q_id,attempt,marks_obtained,total_marks } = await req.json();
    const accessToken = req.headers.get('authorization')?.split(' ')[1];
    console.log('kese: ', s_id,q_id,attempt,marks_obtained,total_marks)
    // console.log("tok: ", accessToken)
    // const {searchParams} = new URL(req.url);
    // const t = searchParams.get('teacher_id')
    // const c = searchParams.get('course_id')
    // const s = searchParams.get('student_id')

    // console.log('Now: ', c,t,s,jwt.decode(accessToken!).s_id)
    // if(!t && !c && !s){
    //     return NextResponse.json('Invalid parameters')
    // }
    // console.log('st_id: ', jwt.decode(accessToken!)?.s_id);
    // console.log("kese: ", jwt.decode(accessToken!)?.s_id, s, typeof s,typeof jwt.decode(accessToken!)?.s_id)
    // @ts-ignore
    if(jwt.decode(accessToken!)?.s_id != s_id){
        return NextResponse.json('Access Denied');  
    }

    const res = await query({
        query: `insert into quiz_attempt values(?,?,?,?,?,NOW());`,
        values: [s_id,q_id,attempt,marks_obtained,total_marks]
    });

    // const result = await res.json();
    // console.log("yours: ", res)
    console.log('haaan: ', res)
    return NextResponse.json(true);
}

