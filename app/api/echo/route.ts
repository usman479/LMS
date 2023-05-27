import { NextRequest,NextResponse } from "next/server";
import { limiter } from "../config/limiter";

export async function GET(request:NextRequest) {

    const origin = request.headers.get('origin');

    const remaining = await limiter.removeTokens(1);
    console.log('remaining: ', remaining)

    if(remaining < 0){
        return new NextResponse(null,{
            status:429,
            statusText:"Too many requests",
            headers:{
                "Access-Control-Allow-Origin": origin || "*",
                "Content-Type": "text/plain"
            }
        })
    }

    const {searchParams} = new URL(request.url);
    // const id = searchParams.get('id');
    // const name = searchParams.get('name');
    const obj = Object.fromEntries(searchParams.entries());

//   return  NextResponse.json({name,id})
    return  NextResponse.json(obj);

}
