import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import jwt from 'jsonwebtoken'
// import { getSession, useSession } from "next-auth/react";
// import { NextApiRequest } from "next";

// function parseJwt (token:string) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     jwt.decode

//     return JSON.parse(jsonPayload);
// }

export async function POST(request: Request) {

    // const {data:session} = useSession();

    // console.log('name: ',session?.user.s_name);

    const { s_id } = await request.json();
    // const accessToken = request.headers.get('authorization');
    // console.log('Token: ', accessToken);
    // console.log("payload: ", JSON.stringify(jwt.decode(accessToken!)));

    const res = await query({ query: 'select c.c_id course_id,c.c_title as course_name,e.t_id from enroll_assign e join course c on e.c_id = c.c_id where e.s_id = ?', values: [s_id] });
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