"use client"
import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react';

export default function page() {
    const {data:session,status} = useSession();
    console.log(status)
    const [data,setData] = useState({title:"",id:""});
    const handleOnSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submit = await fetch("http://localhost:3000/api/hello", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({title:data.title,id:data.id})
        })

        alert("record inserted successfully")
    } 
  return (
    <form action="POST" onSubmit={handleOnSubmit} className='flex justify-center items-center'>
        <input type="text" name="title" id="" value={data.title} onChange={e => setData({id:data.id,title:e.target.value})} className='border-2' placeholder='title'/>
        <br />
        <input type="number" name="id" id="" value={data.id}  onChange={e => setData({id:e.target.value,title:data.title})} className='border-2' placeholder='id'/>
        <br />
        <button type="submit" className='border-2'>Submit</button>
    </form>
  )
}
