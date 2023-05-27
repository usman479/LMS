import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type User = {
    user_id: string,
    password: string
}
export async function POST(request: NextRequest) {
    const {name, userId, password } = await request.json();
    if (!userId || !password || !name) return NextResponse.json({ "message": "missing required data" });

    const req = await query({
        query: "insert into user values(?,?)",
        values: [userId, password]
    })

    console.log(req)

    // const userExist = req.length;

    // return !!userExist ? NextResponse.json({data:req}): NextResponse.json(null);

    // // console.log('user info: ', !!userExist);

    // return NextResponse.json({userExist:!!userExist})
}