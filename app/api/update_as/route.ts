import { NextRequest,NextResponse } from "next/server";
import { query } from "@/lib/db";
export async function PUT(req:NextRequest){

    const {a_id,due_date} = await req.json();
    
    const res = await query({
        query:'update assignment set at_due_date = ? where at_id = ?;',
        values:[due_date,a_id]
    })

    const new_date = await query({
        query:'select at_due_date from assignment where at_id = ?',
        values:[a_id]
    })

    return NextResponse.json(new_date[0]);

}