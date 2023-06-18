import { query } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest){
    // const {s_id} = await req.json(); 
    const {searchParams} = new URL(req.url);
    const {t_id} = {t_id:searchParams.get('t_id')};

    const res = await query({
        query:'select t_id,t_name,t_image from teacher where t_id = ?;',
        values:[t_id!]
    })


    return NextResponse.json(res[0]); 
}

export async function PUT(req:NextRequest){
    const {image,t_id} = await req.json();

    const res = await query({
        query:'update teacher set t_image = ? where t_id = ?',
        values:[image,t_id!]
    })

    return NextResponse.json(true);
}

export async function DELETE(req:NextRequest){
    // const {image,s_id} = await req.json();
    const {searchParams} = new URL(req.url);
    const {t_id} = {t_id:searchParams.get('t_id')}

    const res = await query({
        query:'update teacher set t_image = NULL where t_id = ?;',
        values:[t_id!]
    })

    return NextResponse.json(true);
}

export async function PATCH(req:NextRequest){
    const {t_id,oldPassword,newPassword} = await req.json();

    const res = await query({
        query:'select distinct * from teacher where t_id = ? AND password = ?',
        values:[t_id!,oldPassword!]
    })

    if(res[0]){
        const update = await query({
            query:'update teacher set password = ? where t_id = ?',
            values:[newPassword!,t_id!]
        })

        return NextResponse.json(true);
    }

    return NextResponse.json(false);
}