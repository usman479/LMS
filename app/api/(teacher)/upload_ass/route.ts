import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    // const {data:session} = useSession();

    // console.log('name: ',session?.user.s_name);

    const {topic,desc,dueDate,selectedCourse,fileLink } = await request.json();
    // const accessToken = request.headers.get('authorization');
    // console.log('Token: ', accessToken);
    // console.log("payload: ", JSON.stringify(jwt.decode(accessToken!)));
    for(let i=0; i<selectedCourse.length; i++){
        try{
            const res = await query({ query: `insert into assignment (at_topic, at_desc, at_upload_date, at_due_date,c_id,at_file) values(?,?,current_timestamp(),?,?,?);`, values: [topic,desc,dueDate,selectedCourse[i],fileLink]});
        } catch(e){
            return NextResponse.json(false)
        }
    }
    // const origin = request.headers.get('origin');
    // const res = await fetch(DATA_SOURCE_URL);
    // const data: Todo[] = await res.json();

    return NextResponse.json(true);
    // console.log("there: ", origin)
    // return new NextResponase(JSON.stringify(data), {
    //     headers: {
    //         'Access-Control-Allow-Origin': origin || '*',
    //         'Content-Type': 'application/json'
    //     }
    // });
}

export async function DELETE(req:NextRequest){

    const {searchParams} = new URL(req.url);
    const {at_id} = {at_id:searchParams.get('at_id')};

    try{
        const res = await query({
            query:'delete from assignment where at_id = ?',
            values:[at_id!]
        })
        
        return NextResponse.json(true)
    } catch(e){
        return NextResponse.json(false);
    }





}