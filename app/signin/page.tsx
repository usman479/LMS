'use client'
import React, { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'

export default function SignIn() {
    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const result = await signIn('credentials',{
            userId:id.current?.value,
            password:password.current?.value,
            redirect:true,
            callbackUrl:'/my'
        })
        console.log(id.current?.value, password.current?.value);
    }
    // const [data,setData] = useState({
    //     userId:'',
    //     password:''
    // })

    // const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const result = await signIn('credentials',{
    //         userId:data.userId,
    //         password:data.password,
    //         redirect:true,
    //         callbackUrl:'/'
    //     })

    //     console.log('never: ', result)
    // }
    return (
        // <>
            <div className="md:flex h-screen">
                <div className="flex items-center justify-center mt-28 md:mt-0 md:flex-grow">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight leading-loose m-6">
                            Log in to Account
                        </h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="text"
                                    name="id"
                                    id="my_email"
                                    className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                    placeholder=" "
                                    required
                                    ref={id}
                                />
                                <label
                                    htmlFor="my_email"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    User Id
                                </label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="password"
                                    name="password"
                                    id="my_password"
                                    className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:border-gray-600 focus:outline-none peer"
                                    placeholder=" "
                                    required
                                    ref={password}
                                />
                                <label
                                    htmlFor="my_password"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Password
                                </label>
                            </div>
                            <input
                                type="submit"
                                value="Log in"
                                className="border-2 rounded-md bg-black focus:bg-gray-800 text-white w-full py-2 px-10"
                            />
                        </form>
                    </div>
                </div>
                <img src="http://source.unsplash.com/random/?study?books?stationery/300x320" alt="students" className='w-1/2 object-cover hidden md:block'/>
            </div>
    )
}