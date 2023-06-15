import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    // const {data:session} = useSession();

    // console.log('name: ',session?.user.s_name);

    const {topic,desc,selectedCourse } = await request.json();
    // const accessToken = request.headers.get('authorization');
    // console.log('Token: ', accessToken);
    // console.log("payload: ", JSON.stringify(jwt.decode(accessToken!)));
    for(let i=0; i<selectedCourse.length; i++){
        try{
            const res = await query({ query: `insert into course_material (m_topic, m_desc, m_upload_date, c_id) values
            (?, ?, current_timestamp(), ?);`, values: [topic,desc,selectedCourse[i]]});
        } catch(e){
            return NextResponse.json(false)
        }
    }
    // const origin = request.headers.get('origin');
    // const res = await fetch(DATA_SOURCE_URL);
    // const data: Todo[] = await res.json();

    return NextResponse.json(true);
    // console.log("there: ", origin)
    // return new NextResponse(JSON.stringify(data), {
    //     headers: {
    //         'Access-Control-Allow-Origin': origin || '*',
    //         'Content-Type': 'application/json'
    //     }
    // });
}