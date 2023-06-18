
import { NextRequest,NextResponse } from "next/server";
import { query } from "@/lib/db";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    // const { t_id, c_id } = params;
    const accessToken = req.headers.get('authorization')?.split(' ')[1];
    // console.log("tok: ", accessToken)
    // const {searchParams} = new URL(req.url);
    // const t = searchParams.get('teacher_id')
    // const c = searchParams.get('course_id')
    const {q_id,t_id,c_id} = await req.json();
    // console.log('Now: ', c,t,s,jwt.decode(accessToken!).s_id)
    if(!t_id){
        return NextResponse.json('Invalid parameters')
    }
    // console.log('st_id: ', jwt.decode(accessToken!)?.s_id);
    // console.log("kese: ", jwt.decode(accessToken!)?.s_id, s, typeof s,typeof jwt.decode(accessToken!)?.s_id)
    let load:any = jwt.decode(accessToken!);
    if(load?.t_id != t_id){
        return NextResponse.json('your are no eligible to access this page');
    }

    const res = await query({
        query: `select s.s_id, s.s_name, qa.upload_date, qa.marks_obtained, qa.total_marks  from student s join enroll_assign e on s.s_id = e.s_id and  e.c_id = ?
        left join quiz_attempt qa on s.s_id = qa.s_id where qa.q_id = ? or qa.q_id is null order by qa.marks_obtained desc; `,
        values: [c_id!,q_id!]
    });

    // const result = await res.json();
    // console.log("yours: ", res)
    // console.log('haaan: ', res)
    return NextResponse.json(res);
}