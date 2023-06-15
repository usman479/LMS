import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { signJwtAccessToken } from "@/lib/jwt";

type User = {
    name:string
    user_id: string,
    password: string
}
export async function POST(request: NextRequest) {
    const { userId, password } = await request.json();
    if (!userId || !password) return NextResponse.json({ "message": "missing required data" });
    let role;
    let res;
    console.log('kese: ', userId)
    if(userId[0] === 't' && userId[1] === 'c'){
        res = await query({
            query: "select distinct * from teacher where t_id = ? and password = ?",
            values: [userId, password]
        })
        role = 'teacher';
    } else {
        res = await query({
            query: "select distinct * from student where s_id = ? and password = ?",
            values: [userId, password]
        })
        role = 'student';
    }


    // @ts-ignore
    const userExist = res.length;
    // @ts-ignore
    const {password:pass,...userWithoutPass} = res[0];
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
        ...userWithoutPass,
        accessToken,
        role,
    }
    // console.log("why: ", result);

    return !!userExist ? NextResponse.json(result): NextResponse.json(null);

    // console.log('user info: ', !!userExist);

    // return NextResponse.json({userExist:!!userExist})

    // const res = await fetch(DATA_SOURCE_URL, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'API-Key': API_KEY
    //     },
    //     body: JSON.stringify({ userId, title, completed: false })
    // })

    // const newTodo: Todo = await res.json();

    // return NextResponse.json(newTodo);
}