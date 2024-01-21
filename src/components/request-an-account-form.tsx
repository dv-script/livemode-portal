"use client";
import { requestAnAccount } from "@/actions/request-an-account";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Checkbox, Input } from "@nextui-org/react";
import { allRolesWithoutAdmin } from "@/utils/constants/all-roles-without-admin";
import { SubmitButton } from "./submit-button";

export function RequestAnAccountForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(requestAnAccount, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state.success, state.message]);

  return (
    <form
      action={dispatch}
      className="max-w-3xl w-full p-8 my-8 mx-4 bg-white text-gray-800 border border-gray-200 rounded-lg flex flex-col gap-6"
    >
      <h1 className="text-2xl font-semibold">Request an account</h1>
      <p className="text-sm text-gray-600">
        Fill out the form below to request an account.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            label="E-mail address"
            name="email"
            type="email"
            placeholder="Enter the e-mail address"
          />
          {state?.errors?.email?.map((error) => (
            <span
              key={error}
              aria-live="polite"
              className="text-red-500 text-sm"
            >
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            label="Company"
            name="company"
            type="text"
            placeholder="Enter your company"
          />
          {state?.errors?.company?.map((error) => (
            <span
              key={error}
              aria-live="polite"
              className="text-red-500 text-sm"
            >
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Input
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
            />
            {state?.errors?.firstName?.map((error) => (
              <span
                key={error}
                aria-live="polite"
                className="text-red-500 text-sm"
              >
                {error}
              </span>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
            />
            {state?.errors?.lastName?.map((error) => (
              <span
                key={error}
                aria-live="polite"
                className="text-red-500 text-sm"
              >
                {error}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Input
              label="Country"
              name="country"
              placeholder="Enter your country"
            />
            {state?.errors?.country?.map((error) => (
              <span
                key={error}
                aria-live="polite"
                className="text-red-500 text-sm"
              >
                {error}
              </span>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Input label="State" name="state" placeholder="Enter your state" />
            {state?.errors?.state?.map((error) => (
              <span
                key={error}
                aria-live="polite"
                className="text-red-500 text-sm"
              >
                {error}
              </span>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Input label="City" name="city" placeholder="Enter your city" />
            {state?.errors?.city?.map((error) => (
              <span
                key={error}
                aria-live="polite"
                className="text-red-500 text-sm"
              >
                {error}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Input
              label="Address"
              name="address"
              placeholder="Enter your address"
            />
            {state?.errors?.address?.map((error) => (
              <span
                key={error}
                aria-live="polite"
                className="text-red-500 text-sm"
              >
                {error}
              </span>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Input
              label="Phone"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
            />
            {state?.errors?.phoneNumber?.map((error) => (
              <span
                key={error}
                aria-live="polite"
                className="text-red-500 text-sm"
              >
                {error}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Access to portals:
          </span>

          <ul className="flex flex-col gap-2 py-2 px-1">
            {allRolesWithoutAdmin.map((role) => (
              <li key={role.key}>
                <Checkbox
                  name="roles"
                  value={role.key}
                  classNames={{
                    label: "text-small",
                  }}
                >
                  {role.name}
                </Checkbox>
              </li>
            ))}
            {state.errors?.roles &&
              state.errors.roles.map((error) => (
                <p
                  aria-live="polite"
                  key={error}
                  className="text-xs text-red-500"
                >
                  {error}
                </p>
              ))}
          </ul>
        </div>
      </div>

      <SubmitButton title="Request an account" />

      <div className="text-sm text-center">
        <Link href="/auth/sign-in">
          <span className="text-gray-500 hover:text-gray-800 hover:underline">
            Already have an account? Log-in
          </span>
        </Link>
      </div>
    </form>
  );
}
