import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    // const {data:session} = useSession();

    // console.log('name: ',session?.user.s_name);

    const {date } = await request.json();
    // const accessToken = request.headers.get('authorization');
    // console.log('Token: ', accessToken);
    // console.log("payload: ", JSON.stringify(jwt.decode(accessToken!)));
    const data = await query({ query: `insert into attendance (date_of_attendance) values(?);`, values: [date]});
    const res = await query({query:'select a_id from attendance order by a_id desc limit 1',values:[]});
    // const origin = request.headers.get('origin');
    // const res = await fetch(DATA_SOURCE_URL);
    // const data: Todo[] = await res.json();

    return NextResponse.json({a_id:res[0].a_id});
    // console.log("there: ", origin)
    // return new NextResponse(JSON.stringify(data), {
    //     headers: {
    //         'Access-Control-Allow-Origin': origin || '*',
    //         'Content-Type': 'application/json'
    //     }
    // });
}