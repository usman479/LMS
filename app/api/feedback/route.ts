import { NextRequest,NextResponse } from "next/server";

type Feedback = {
    name?:string,
    email?:string,
    message?:string
}

export async function POST(request:Request){
    const data:Feedback = await request.json();
    console.log('data: ' + data);
    console.log("here it is for you !")

    const {name,email,message} = data;
    return NextResponse.json({name,email,message});
}