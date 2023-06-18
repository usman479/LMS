import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    // const {data:session} = useSession();

    // console.log('name: ',session?.user.s_name);

    const { a_id, attendance } = await request.json();
    // const accessToken = request.headers.get('authorization');
    // console.log('Token: ', accessToken);
    // console.log("payload: ", JSON.stringify(jwt.decode(accessToken!)));

    let myQuery = 'insert into mark_attendance (s_id, a_id, attendance_state) values';

    for (let x in attendance) {
        // txt += attendance[x];
        myQuery += '(';
        myQuery += `'${x}',${a_id},${attendance[x]}`
        myQuery += '),';
    }
    
    myQuery =  myQuery.slice(0,myQuery.length-1);
    console.log('query: ', myQuery)
    const res = await query({
        query: myQuery, values: []
    });
    // const origin = request.headers.get('origin');
    // const res = await fetch(DATA_SOURCE_URL);
    // const data: Todo[] = await res.json();

    return NextResponse.json(res);
    // console.log("there: ", origin)
    // return new NextResponase(JSON.stringify(data), {
    //     headers: {
    //         'Access-Control-Allow-Origin': origin || '*',
    //         'Content-Type': 'application/json'
    //     }
    // });
}