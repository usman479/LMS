'use client'
import React, { use } from "react";
import { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import Link from "next/link";
import "@uploadthing/react/styles.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { Store } from "../layout";


interface UserProfile {
    t_id: string;
    t_name: string;
    t_image: string;
    // userPassword: string;
}

interface IImage {
    fileUrl: string;
    fileKey: string
}

export default function ProfilePage() {
    const [password, setPassword] = useState(false);
    const [image, setImage] = useState<IImage[] | null>(null)
    const { data: session, status, update } = useSession();
    const [user, setUser] = useState<UserProfile | null>(null);
    const router = useRouter();
    const [passUpdated, setPassUpdated] = useState<string | null>(null);
    const [passMatched,setPassMatched] = useState(true);



    useEffect(() => {
        if (status === 'authenticated') {
            const res = fetch(`http://localhost:3000/api/teacher_profile?t_id=${session?.user.t_id}`)
                .then(data => data.json()).then(data => setUser(data))
        }
    }, [status])



    const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let deleteCheckbox = e.target.deleteCheckbox.checked;
        if (image && image[0]) {
            const res = fetch('http://localhost:3000/api/teacher_profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: image[0].fileUrl, t_id: user?.t_id })
            }).then(data => {
                e.target.deleteCheckbox.checked = false;
                setImage(null)
                update()
            })
        } else if (deleteCheckbox) {
            const res = fetch(`http://localhost:3000/api/teacher_profile?t_id=${session?.user.t_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                e.target.deleteCheckbox.checked = false;
                update()
            })
        }
    }

    const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPassMatched(true);
        setPassUpdated(null);
        if(e.target.newPass.value !== e.target.cnfNewPass.value){
            setPassMatched(false);
            return;
        } 

        const res = fetch('http://localhost:3000/api/teacher_profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                t_id: session?.user.t_id,
                oldPassword: e.target.oldPass.value,
                newPassword: e.target.newPass.value
            })
        }).then(data => data.json()).then(data => {
            data ? setPassUpdated('changed') : setPassUpdated('incorrect')
        });


    }

    if (user) {
        const src = user.t_image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        return (
            <>
                <div className="md:ml-[80px] m-4 px-2">

                    <div className="my-4 px-6 pt-2 pb-8 bg-white border-2 shadow-md h-auto flex flex-col items-start">
                        <h1 className="text-3xl text-left font-medium tracking-normal leading-snug select-none">
                            My LMS Profile
                        </h1>
                        <form action="" onSubmit={e => handleUpdateProfile(e)}>
                            <div className="my-6 flex sm:flex-row flex-col sm:items-center sm:justify-between">
                                <label
                                    htmlFor="stName"
                                    className="mb-2 mr-16 text-base font-semibold text-gray-900"
                                >
                                    Name{" "}
                                </label>
                                <input
                                    type="text"
                                    name="stName"
                                    id="stName"
                                    value={user.t_name}
                                    className="w-full sm:w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <div className="my-6 flex sm:flex-row flex-col sm:items-center sm:justify-between">
                                <label
                                    htmlFor="stId"
                                    className="mb-2 mr-16 text-base font-semibold text-gray-900"
                                >
                                    Student ID{" "}
                                </label>
                                <input
                                    type="text"
                                    name="stId"
                                    id="stId"
                                    value={user.t_id}
                                    className="w-full sm:w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5 cursor-not-allowed sel"
                                    disabled
                                />
                            </div>
                            
                            <div className="my-6 flex items-center ">
                                <label
                                    htmlFor="prfPic"
                                    className="mb-2 mr-16 text-base font-semibold text-gray-900"
                                >
                                    Profile Picture{" "}
                                </label>
                                <div>
                                    <Avatar className="mb-2 w-16 h-16 select-none">
                                        <AvatarImage src={src} className="object-center object-cover" />
                                        <AvatarFallback>Profile Picture</AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-1"
                                            type="checkbox"
                                            value=""
                                            name='deleteCheckbox'
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            disabled={
                                                src ===
                                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                            }
                                        />
                                        <label
                                            htmlFor="checkbox-1"
                                            className={
                                                (src ===
                                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                    ? ` opacity-70 `
                                                    : ` opacity-100 `) +
                                                `ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 select-none`
                                            }
                                        >
                                            Delete picture
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="my-6 flex sm:flex-row flex-col sm:items-center sm:justify-between">
                                <label
                                    htmlFor="newPic"
                                    className="mb-2 mr-16 text-base font-semibold text-gray-900"
                                >
                                    New Picture{" "}
                                </label>
                                {/* <input
                type="file"
                name="newPic"
                id="newPic"
                className="w-full sm:w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5 cursor-not-allowed"
              /> */}
                                <div className="flex items-start gap-x-2">
                                    <UploadButton<OurFileRouter>
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            if (res) {
                                                setImage(res);
                                                // const json  = JSON.stringify(res);
                                                // Do something with the response
                                                // console.log("Files: ", res);
                                                console.log(res[0].fileUrl);
                                            }
                                            // alert("Upload Completed");
                                        }}
                                        onUploadError={(error: Error) => {
                                            // Do something with the error.
                                            alert(`ERROR! ${error.message}`);
                                        }}

                                    />
                                    {/* <p className="text-2xl">✔</p> */}
                                    {image && <p className="text-4xl text-green-500 duration-500">✔</p>}
                                </div>
                            </div>
                            <button className="mb-6 bg-gray-900 hover:bg-gray-900 hover:scale-110 hover:duration-200 text-white w-auto font-medium rounded-lg text-sm px-4 py-2"

                            >
                                Update Profile
                            </button>
                        </form>
                        <button
                            className="mb-2 text-base font-medium text-gray-900 underline"
                            onClick={() => setPassword(!password)}
                        >
                            Reset Password
                        </button>
                        {password && (
                            <form action="" onSubmit={e => handlePasswordReset(e)}>
                                <div className="my-6 flex sm:flex-row flex-col sm:items-center sm:justify-between">
                                    <label
                                        htmlFor="oldPass"
                                        className="basis-2/5 mb-2 text-base font-semibold text-gray-900"
                                    >
                                        Old Password{" "}
                                    </label>
                                    <div className="basis-3/5 w-full sm:w-2/3 sm:ml-6">
                                        <input
                                            type="password"
                                            name="oldPass"
                                            id="oldPass"
                                            className={`w-full ${passUpdated === 'incorrect' ? "bg-red-300" : "bg-gray-50"} border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5`}
                                            required
                                        />
                                        {passUpdated === 'incorrect' ? <p className="text-red-600">Incorrect Password</p> : null}
                                    </div>
                                </div>

                                <div className="my-6 flex sm:flex-row flex-col sm:items-center sm:justify-between">
                                    <label
                                        htmlFor="newPass"
                                        className="basis-2/5 mb-2 text-base font-semibold text-gray-900"
                                    >
                                        New Password{" "}
                                    </label>
                                    <input
                                        type="password"
                                        name="newPass"
                                        id="newPass"
                                        className="basis-3/5 w-full sm:w-2/3 sm:ml-6 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5"
                                        required
                                    />
                                </div>
                                <div className="my-6 flex sm:flex-row flex-col sm:items-center sm:justify-between">
                                    <label
                                        htmlFor="newPass"
                                        className="basis-2/5 mb-2 text-base font-semibold text-gray-900"
                                    >
                                        Confirm Password{" "}
                                    </label>
                                    <div className="basis-3/5 w-full sm:w-2/3 sm:ml-6">
                                        <input
                                            type="password"
                                            name="cnfNewPass"
                                            id="cnfNewPass"
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5"
                                            required
                                        />
                                        {passUpdated === 'changed' && <p className="text-green-600">Password Changed ✔</p>}
                                        {!passMatched && <p className="text-red-600">Password doesn't matched ❌</p>}
                                    </div>
                                </div>
                                <button
                                    // type="submit"
                                    className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    Set password
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </>
        );
    }
    return (
        <p>Loading...</p>
    )
}
