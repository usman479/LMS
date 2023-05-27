import { NextResponse,NextRequest } from "next/server";
import {query} from "@/lib/db"

export async function POST(request:NextRequest) {
    const {id,title} = await request.json();
    const req = await query({
        query:"insert into todo values(?,?,?)",
        values:[id,false,title]
    })

    console.log(req)
    // const data = await req.json();
    return NextResponse.json(req);
}