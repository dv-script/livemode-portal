"use client";
import { useFormState } from "react-dom";
import { useState } from "react";
import Link from "next/link";
import { PiCaretLeft, PiPassword } from "react-icons/pi";
import { addANewUser } from "@/actions/addANewUser";
import { createHash } from "@/utils/createHash";

export function AddANewUserForm() {
    const [password, setPassword] = useState("");
    const initialState = { message: null, errors: {} }
    //@ts-ignore
    const [state, dispatch] = useFormState(addANewUser, initialState);

    function generatePassword() {
        const hash = createHash();
        setPassword(hash)
    }


    return (
        <form action={dispatch} className="max-w-3xl w-full p-8 my-8 mx-4 bg-white text-gray-800 border border-gray-200 rounded-lg flex flex-col gap-6">
            <div className="relative flex items-center justify-center w-full">
                <Link href="/admin" className="absolute left-0 rounded-full p-2 transition-colors bg-gray-100 hover:bg-gray-300">
                    <PiCaretLeft />
                </Link>
                <h1 className="text-2xl font-semibold">Add a new user</h1>
            </div>
            <p className="text-sm text-center text-gray-600">
                Here you can add a new user to the system.
            </p>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">E-mail</label>
                    <input name="email" type="email" placeholder="E-mail address" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    {state?.errors?.email?.map((error: string) => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="flex justify-center align-center gap-2">
                        <input name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} type="text" placeholder="Enter a password" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        <button type="button" onClick={generatePassword} className="p-2  border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            <PiPassword />
                        </button>
                    </div>
                    {state?.errors?.password?.map((error: string) => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap text-ellipsis">Company</label>
                    <input name="company" placeholder="Enter a company" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    {state?.errors?.company?.map((error: string) => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap text-ellipsis">First Name</label>
                        <input name="firstName" placeholder="Enter a first name" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        {state?.errors?.firstName?.map((error: string) => (
                            <span key={error} className="text-red-500">{error}</span>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap text-ellipsis">Last Name</label>
                        <input name="lastName" placeholder="Enter a last name" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        {state?.errors?.lastName?.map((error: string) => (
                            <span key={error} className="text-red-500">{error}</span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">Access to portals:</span>
                    {state?.errors?.roles?.map((error: string) => (
                        <span key={error} className="text-red-500">{error}</span>
                    ))}

                    <label className="flex items-center gap-2">
                        <input 
                            name="roles" 
                            value="b2b_portal"
                            type="checkbox"
                            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        B2B Portal
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            name="roles"
                            value="photo_database"
                            type="checkbox"
                            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        Photo Database
                    </label>

                    <label className="flex items-center gap-2">
                        <input 
                            name="roles" 
                            value="commentary_live_system" 
                            type="checkbox" 
                            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        Commentary Live System
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            name="roles"
                            value="costumer_service_tool"
                            type="checkbox"
                            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        Costumer Service Tool
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            name="roles"
                            value="match_analysis_hub"
                            type="checkbox"
                            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        Match Analysis Hub
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            name="roles"
                            value="media_portal"
                            type="checkbox"
                            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        Media Portal
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            name="roles"
                            value="admin"
                            type="checkbox"
                            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        Administrator
                    </label>

                </div>
            </div>

            <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Request an account</button>
        </form>
    )
}