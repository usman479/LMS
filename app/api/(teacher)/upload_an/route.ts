import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    
    const {topic,desc,link,selectedCourse } = await request.json();
    console.log('first: ',topic,desc,link,selectedCourse)
    // const accessToken = request.headers.get('authorization');
    // console.log('Token: ', accessToken);
    // console.log("payload: ", JSON.stringify(jwt.decode(accessToken!)));
    for(let i=0; i<selectedCourse.length; i++){
        try{
            const res = await query({ query: `insert into course_announcement(an_topic,an_desc,link,c_id,an_upload_date) values(?,?,?,?,current_timestamp());`, values: [topic,desc,link,selectedCourse[i]]});
        } catch(e){
            console.log('keeee')
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