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

    // console.log("kese: ", jwt.decode(accessToken!)?.s_id, s, typeof s,typeof jwt.decode(accessToken!)?.s_id)
    if(jwt.decode(accessToken!)?.s_id != Number(s)){
        return NextResponse.json('your are no eligible to access this page');
    }

    const res = await query({
        query: `select a.at_id as assignment_id, a.as_desc as assignment_description, a.ass_upload_date as upload_date, a.ass_due_date as due_date, t.t_name as teacher_name, c.c_title as course_name 
     from assignment a
     join teacher t on t.t_id = a.t_id
     join course c on c.c_id = a.c_id
     where t.t_id = ? and c.c_id = ? order by a.ass_due_date desc; `,
        values: [t!, c!]
    });

    // const result = await res.json();
    // console.log("yours: ", res)
    return NextResponse.json(res);
}