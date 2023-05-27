import { query } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const accessToken = req.headers.get('authorization');
    if (!accessToken || !verifyJwt(accessToken)) {
        return NextResponse.json({
            error: 'unauthorized'
        }, {
            status: 401,
        }
        )
    }
    const todo = await query({ query: 'select distinct * from todo where id = ?', values: [params.id] })

    return NextResponse.json(todo);
}