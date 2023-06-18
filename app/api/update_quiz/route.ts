import { NextRequest,NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function PUT(req:NextRequest){

    const {q_id,due_date} = await req.json();
    
    const res = await query({
        query:'update quiz set q_due_date = ? where q_id = ?;',
        values:[due_date,q_id]
    })

    const new_date = await query({
        query:'select q_due_date from quiz where q_id = ?',
        values:[q_id]
    })

    return NextResponse.json(new_date[0]);

}