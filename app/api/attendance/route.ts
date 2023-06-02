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
    if (jwt.decode(accessToken!)?.s_id != Number(s)) {
        return NextResponse.json('your are no eligible to access this page');
    }

    const res = await query({
        query: `select date_of_attendance, attendance_state, t.t_name as teacher_name from mark_attendance m
        join attendance a on m.a_id = a.a_id
        join teacher t on t.t_id = m.t_id 
        where (m.s_id = ? and m.c_id = ? and m.t_id = ? ) order by date_of_attendance asc`,
        values: [s!, c!, t!]
    });

    // const result = await res.json();
    // console.log("yours: ", res)
    return NextResponse.json(res);
}