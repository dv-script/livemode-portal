"use client";
import InputMask from "react-input-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestAnAccount } from "@/actions/requestAnAccount";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as z from "zod";

interface ICountries {
    name: {
        common: string
        official: string
        nativeName: {
            [key: string]: {
                official: string
                common: string
            }
        }
    }
}

const phoneRegexPatterns = {
    'Brazil': /^\(\d{2}\) \d{5}-\d{4}$/,
    'United States': /^\(\d{3}\) \d{3}-\d{4}$/,
};

export function RequestAnAccountForm() {

    const RequestAnAccountFormSchema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        company: z.string(),
        firstName: z.string().min(2, { message: 'First name has to be at least 2 characters long' }),
        lastName: z.string().min(2, { message: 'Last name has to be at least 2 characters long' }),
        country: z.string(),
        state: z.string(),
        city: z.string(),
        address: z.string(),
        phoneNumber: z.string().refine((value) => {
            (selectedCountry === "Brazil" || selectedCountry === "United States")
                ? phoneRegexPatterns[selectedCountry].test(value)
                : true
        }, {
            message: "Phone number isn't valid",
        }),
        b2bPortal: z.boolean(),
        photoDatabase: z.boolean(),
        commentaryLiveSystem: z.boolean(),
        customerServiceTool: z.boolean(),
        matchAnalysisHub: z.boolean(),
        mediaPortal: z.boolean(),
    })

    const form = useForm<z.infer<typeof RequestAnAccountFormSchema>>({
        resolver: zodResolver(RequestAnAccountFormSchema)
    });

    const [countries, setCountries] = useState([] as ICountries[]);
    const selectedCountry = form.watch("country");

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    const onSubmit = async (data: z.infer<typeof RequestAnAccountFormSchema>) => {
        await requestAnAccount({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            company: data.company,
            country: data.country,
            state: data.state,
            city: data.city,
            address: data.address,
            phoneNumber: data.phoneNumber,
            b2bPortal: data.b2bPortal,
            photoDatabase: data.photoDatabase,
            commentaryLiveSystem: data.commentaryLiveSystem,
            customerServiceTool: data.customerServiceTool,
            matchAnalysisHub: data.matchAnalysisHub,
            mediaPortal: data.mediaPortal
        });
        console.log(data);
        form.reset()
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="z-10 max-w-3xl w-full p-8 my-8 mx-4 bg-white text-gray-800 border border-gray-200 rounded-lg flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Request an account</h1>
            <p className="text-sm text-gray-600">
                Fill out the form below to request an account.
            </p>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">E-mail</label>
                    <input {...form.register("email")} type="email" placeholder="E-mail address" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Company</label>
                    <input {...form.register("company")} type="text" placeholder="Enter your company" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">First Name</label>
                        <input {...form.register("firstName")} placeholder="Your first name" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                        <input {...form.register("lastName")} placeholder="Your last name" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Country</label>
                        <select {...form.register("country")} value={selectedCountry} className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            {countries.map((country, index) => (
                                <option key={index} value={country.name.common}>{country.name.common}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">State</label>
                        <input {...form.register("state")} placeholder="Your state" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <input {...form.register("city")} placeholder="Your city" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <input {...form.register("address")} placeholder="Your address" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        {selectedCountry === 'Brazil' ? (
                            <InputMask {...form.register("phoneNumber")} mask={'(99) 99999-9999'} type="tel" placeholder="(99) 99999-9999" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        ) : selectedCountry === 'United States' ? (
                            <InputMask  {...form.register("phoneNumber")} mask={'(999) 999-9999'} type="tel" placeholder="(999) 999-9999    " className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        ) : (
                            <input {...form.register("phoneNumber")} type="tel" placeholder="Your phone number" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">Access to portals:</span>

                    <label className="flex items-center gap-2">
                        <input {...form.register("b2bPortal")} type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        B2B Portal
                    </label>

                    <label className="flex items-center gap-2">
                        <input {...form.register("photoDatabase")} type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Photo Database
                    </label>

                    <label className="flex items-center gap-2">
                        <input {...form.register("commentaryLiveSystem")} type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Commentary Live System
                    </label>

                    <label className="flex items-center gap-2">
                        <input {...form.register("customerServiceTool")} type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Customer Service Tool
                    </label>

                    <label className="flex items-center gap-2">
                        <input {...form.register("matchAnalysisHub")} type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Match Analysis Hub
                    </label>

                    <label className="flex items-center gap-2">
                        <input {...form.register("mediaPortal")} type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Media Portal
                    </label>

                </div>
            </div>

            <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Request an account</button>

            <div className="text-sm text-center">
                <Link href="/sign-in">
                    <span className="text-gray-500 hover:text-gray-800 hover:underline">
                        Already have an account? Log-in
                    </span>
                </Link>
            </div>
        </form>
    )
}