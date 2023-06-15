import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import jwt from 'jsonwebtoken'

type Props = {
    params: {
        teacher_id: string,
        course_id: string
        student_id: string
    }
}

export async function GET(req: NextRequest) {
    // const { t_id, c_id } = params;
    const accessToken = req.headers.get('authorization')?.split(' ')[1];
    // console.log("tok: ", accessToken)
    const { searchParams } = new URL(req.url);
    const t = searchParams.get('teacher_id')
    const c = searchParams.get('course_id')
    const s = searchParams.get('student_id')

    // console.log('Now: ', c,t,s,jwt.decode(accessToken!).s_id)
    if (!t && !c && !s) {
        return NextResponse.json('Invalid parameters')
    }

    // console.log("kese: ", jwt.decode(accessToken!)?.s_id, s, typeof s,typeof jwt.decode(accessToken!)?.s_id)
    let load:any = jwt.decode(accessToken!);
    if (load?.s_id != s) {
        return NextResponse.json('your are no eligible to access this page');
    }

    const res = await query({
        query: `select a.date_of_attendance,m.attendance_state,a.a_id from attendance a 
        join mark_attendance m on m.a_id = a.a_id and m.s_id = ? and a.c_id = ? 
        order by a.date_of_attendance desc;`,
        values: [s!, c!]
    });

    // const result = await res.json();
    // console.log("yours: ", res)
    return NextResponse.json(res);
}