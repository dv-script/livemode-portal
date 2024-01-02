"use client";
import { requestAnAccount } from "@/actions/request-an-account";
import { useFormState } from "react-dom";
import { useState } from "react";
import Link from "next/link";
import { Country, City, State } from "country-state-city";

export function RequestAnAccountForm() {
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedState, setSelectedState] = useState('');

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCountry(e.target.value);
	};

	const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedState(e.target.value);
	};

	const countries = Country.getAllCountries();
	const states = State.getStatesOfCountry(selectedCountry);
	const cities = City.getCitiesOfState(selectedCountry, selectedState);

	const initialState = { message: null, errors: {} }
	//@ts-ignore
	const [state, dispatch] = useFormState(requestAnAccount, initialState);

	return (
		<form action={dispatch} className="max-w-3xl w-full p-8 my-8 mx-4 bg-white text-gray-800 border border-gray-200 rounded-lg flex flex-col gap-6">
			<h1 className="text-2xl font-semibold">Request an account</h1>
			<p className="text-sm text-gray-600">
				Fill out the form below to request an account.
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
					<label className="text-sm font-medium text-gray-700">Company</label>
					<input name="company" type="text" placeholder="Enter your company" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
					{state?.errors?.company?.map((error: string) => (
						<span key={error} className="text-red-500">{error}</span>
					))}
				</div>

				<div className="flex flex-wrap gap-4">
					<div className="flex-1 flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700 whitespace-nowrap text-ellipsis">First Name</label>
						<input name="firstName" placeholder="Your first name" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
						{state?.errors?.firstName?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700 whitespace-nowrap text-ellipsis">Last Name</label>
						<input name="lastName" placeholder="Your last name" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
						{state?.errors?.lastName?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</div>
				</div>

				<div className="flex flex-wrap gap-4">
					<div className="flex-1 flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700">Country</label>
						<select name="country" onChange={(e) => handleCountryChange(e)} className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
							{countries.map((country) => (
								<option key={country.isoCode} value={country.isoCode}>{country.name}</option>
							))}
						</select>
						{state?.errors?.country?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700">State</label>
						<select name="state" onChange={(e) => handleStateChange(e)} className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
							{states.map((state) => (
								<option key={state.isoCode} value={state.isoCode}>{state.name}</option>
							))}
						</select>
						{state?.errors?.state?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700">City</label>
						<select name="city" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
							{cities.map((city) => (
								<option key={city.stateCode} value={city.stateCode}>{city.name}</option>
							))}
						</select>
						{state?.errors?.city?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</div>
				</div>

				<div className="flex flex-wrap gap-4">
					<div className="flex-1 flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700">Address</label>
						<input name="address" placeholder="Your address" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
						{state?.errors?.address?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700 whitespace-nowrap text-ellipsis">Phone Number</label>
						<input name="phoneNumber" type="tel" placeholder="Your phone number" className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
						{state?.errors?.phoneNumber?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-sm font-medium text-gray-700">Access to portals:</span>

					<label className="flex items-center gap-2">
						<input name="b2bPortal" type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
						B2B Portal
						{state?.errors?.b2bPortal?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</label>

					<label className="flex items-center gap-2">
						<input name="photoDatabase" type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
						Photo Database
						{state?.errors?.photoDatabase?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</label>

					<label className="flex items-center gap-2">
						<input name="commentaryLiveSystem" type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
						Commentary Live System
						{state?.errors?.commentaryLiveSystem?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</label>

					<label className="flex items-center gap-2">
						<input name="customerServiceTool" type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
						Customer Service Tool
						{state?.errors?.customerServiceTool?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</label>

					<label className="flex items-center gap-2">
						<input name="matchAnalysisHub" type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
						Match Analysis Hub
						{state?.errors?.matchAnalysisHub?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
					</label>

					<label className="flex items-center gap-2">
						<input name="mediaPortal" type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
						Media Portal
						{state?.errors?.mediaPortal?.map((error: string) => (
							<span key={error} className="text-red-500">{error}</span>
						))}
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