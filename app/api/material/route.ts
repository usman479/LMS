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
    // const t = searchParams.get('teacher_id')
    const c = searchParams.get('course_id')
    const s = searchParams.get('student_id')

    // console.log('Now: ', c,t,s,jwt.decode(accessToken!).s_id)
    if(!c && !s){
        return NextResponse.json('Invalid parameters')
    }
    // console.log('st_id: ', jwt.decode(accessToken!)?.s_id);
    // console.log("kese: ", jwt.decode(accessToken!)?.s_id, s, typeof s,typeof jwt.decode(accessToken!)?.s_id)
    // @ts-ignore
    if(jwt.decode(accessToken!)?.s_id != s){
        return NextResponse.json('your are no eligible to access this page');
    }

    const res = await query({
        query: `select m_desc description,m_upload_date upload_date from course_material where c_id = ?;`,
        values: [c!]
    });

    // const result = await res.json();
    // console.log("yours: ", res)
    console.log('haaan: ', res)
    return NextResponse.json(res);
}