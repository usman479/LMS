import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
// import { getSession, useSession } from "next-auth/react";
// import { NextApiRequest } from "next";

export async function POST(request: Request) {

    // const {data:session} = useSession();

    // console.log('name: ',session?.user.s_name);

    const {s_id} = await request.json();

    console.log(s_id)

    const res = await query({ query: 'select c.c_id course_id,c.c_title as course_name from enroll_assign e join course c on e.c_id = c.c_id where e.s_id = ?', values: [s_id] });
    // const origin = request.headers.get('origin');
    // const res = await fetch(DATA_SOURCE_URL);
    // const data: Todo[] = await res.json();

    return NextResponse.json(res);
    // console.log("there: ", origin)
    // return new NextResponse(JSON.stringify(data), {
    //     headers: {
    //         'Access-Control-Allow-Origin': origin || '*',
    //         'Content-Type': 'application/json'
    //     }
    // });
}