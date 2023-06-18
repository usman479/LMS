import NextAuth from 'next-auth'

type Todo = {
    userId:number,
    id:number,
    title:string,
    completed:boolean
}

type MyTodo = {
    id:number,
    title:string,
    completed:boolean
}


declare module 'next-auth' {
    interface Session {
        user:{
            s_id:string,
            name:string,
            accessToken:string,
            p_id:string,
            semester_num:string,
            role:string,
            s_image:string
        }
    }
}
