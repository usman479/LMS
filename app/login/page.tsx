'use client'
import React, { ChangeEvent, useState } from 'react'

export default function Login() {
    const [input,setInput] = useState({
        email:'',
        password:''
    })


    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setInput(prev => ({...prev,[name]:value}))
    }
  return (
    <div>
        <input type="text" name="email" id="" placeholder='email' value={input.email} onChange={handleChange} />
        <input type="password" name="password" id="" placeholder='password' value={input.password} onChange={handleChange} />
        <button type='button'>Sign in</button>
    </div>
  )
}
