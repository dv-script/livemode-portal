"use client";
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

export function RequestAnAccountForm() {
    const [countries, setCountries] = useState([] as ICountries[]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    function handleSelectCountry(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCountry(event.target.value);
    }
    return (
        <form className="z-10 max-w-3xl w-full p-8 my-8 mx-4 bg-white text-gray-800 border border-gray-200 rounded-lg flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Request an account</h1>
            <p className="text-sm text-gray-600">
                Fill out the form below to request an account.
            </p>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
                    <input id="email" type="email" placeholder="E-mail address" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-sm font-medium text-gray-700">Company</label>
                    <input id="company" type="text" placeholder="Enter your company" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name</label>
                        <input id="first-name" type="text" placeholder="Your first name" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name</label>
                        <input id="last-name" type="text" placeholder="Your last name" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label htmlFor="country" className="text-sm font-medium text-gray-700">Country</label>
                        <select id="country" value={selectedCountry} onChange={handleSelectCountry} className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            {countries.map((country, index) => (
                                <option key={index} value={country.name.common}>{country.name.common}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label htmlFor="state" className="text-sm font-medium text-gray-700">State</label>
                        <input id="state" type="text" placeholder="Your state" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
                        <input id="city" type="text" placeholder="Your city" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                        <input id="address" type="text" placeholder="Your address" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input id="phone" type="tel" placeholder="Your phone number" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">Access to portals:</span>

                    <label htmlFor="b2b-portal" className="flex items-center gap-2">
                        <input type="checkbox" id="b2b-portal" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        B2B Portal
                    </label>

                    <label htmlFor="photo-database" className="flex items-center gap-2">
                        <input type="checkbox" id="photo-database" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Photo Database
                    </label>

                    <label htmlFor="commentary-live-system" className="flex items-center gap-2">
                        <input type="checkbox" id="commentary-live-system" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Commentary Live System
                    </label>

                    <label htmlFor="costumer-service-tool" className="flex items-center gap-2">
                        <input type="checkbox" id="customer-service-tool" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Customer Service Tool
                    </label>

                    <label htmlFor="match-analysis-hub" className="flex items-center gap-2">
                        <input type="checkbox" id="match-analysis-hub" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Match Analysis Hub
                    </label>

                    <label htmlFor="media-portal" className="flex items-center gap-2">
                        <input type="checkbox" id="media-portal" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                        Media Portal
                    </label>

                </div>
            </div>

            <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Request an account</button>

            <div className="text-sm text-center">
                <Link href="/">
                    <span className="text-gray-500 hover:text-gray-800 hover:underline">
                        Already have an account? Log-in
                    </span>
                </Link>
            </div>
        </form>
    )
}