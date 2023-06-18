import { query } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest){
    // const {s_id} = await req.json(); 
    const {searchParams} = new URL(req.url);
    const {s_id} = {s_id:searchParams.get('s_id')};

    const res = await query({
        query:'select s_id,s_name,p_id,semester_num,s_image from student where s_id = ?;',
        values:[s_id!]
    })


    return NextResponse.json(res[0]); 
}

export async function PUT(req:NextRequest){
    const {image,s_id} = await req.json();

    const res = await query({
        query:'update student set s_image = ? where s_id = ?',
        values:[image,s_id!]
    })

    return NextResponse.json(true);
}

export async function DELETE(req:NextRequest){
    // const {image,s_id} = await req.json();
    const {searchParams} = new URL(req.url);
    const {s_id} = {s_id:searchParams.get('s_id')}

    const res = await query({
        query:'update student set s_image = NULL where s_id = ?;',
        values:[s_id!]
    })

    return NextResponse.json(true);
}

export async function PATCH(req:NextRequest){
    const {s_id,oldPassword,newPassword} = await req.json();

    const res = await query({
        query:'select distinct * from student where s_id = ? AND password = ?',
        values:[s_id!,oldPassword!]
    })

    if(res[0]){
        const update = await query({
            query:'update student set password = ? where s_id = ?',
            values:[newPassword!,s_id!]
        })

        return NextResponse.json(true);
    }

    return NextResponse.json(false);
}