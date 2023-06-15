import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    // const {data:session} = useSession();

    // console.log('name: ',session?.user.s_name);

    const { c_id } = await request.json();
    // const accessToken = request.headers.get('authorization');
    // console.log('Token: ', accessToken);
    // console.log("payload: ", JSON.stringify(jwt.decode(accessToken!)));

    const res = await query({
        query: `select s.s_id as id, s.s_name as name from student s
    join enroll_assign e on e.s_id = s.s_id 
    where e.c_id = ?; `, values: [c_id]
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