import { NextRequest, NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request:Request) {
    const origin = request.headers.get('origin');
    const res = await fetch(DATA_SOURCE_URL);
    // @ts-ignore
    const data: Todo[] = await res.json();

    console.log("there: ",origin)
    return new NextResponse(JSON.stringify(data), {
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE(request: NextRequest) {
    // @ts-ignore
    const { id }: Partial<Todo> = await request.json();
    console.log("id: " + id)
    if (!id) return NextResponse.json({ "message": "Todo id required" });

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY
        }
    })

    return NextResponse.json({ "message": `Todo ${id} deleted` });
}

export async function POST(request: NextRequest) {
    // @ts-ignore
    const { userId, title }: Todo = await request.json();
    if (!userId || !title) return NextResponse.json({ "message": "missing required data" });

    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({ userId, title, completed: false })
    })
    // @ts-ignore
    const newTodo: Todo = await res.json();

    return NextResponse.json(newTodo);
}

export async function PUT(request: NextRequest) {
    // @ts-ignore
    const { userId, title, id, completed }: Todo = await request.json();
    if (!userId || !title || !id || typeof (completed) !== 'boolean') return NextResponse.json({ "message": "missing required data" });

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({ userId, title, completed: false })
    })
    // @ts-ignore
    const updatedTodo: Todo = await res.json();

    return NextResponse.json(updatedTodo);
}