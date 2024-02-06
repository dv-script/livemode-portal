"use client";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PiCaretLeft, PiPassword } from "react-icons/pi";
import { addANewUser } from "@/actions/add-a-new-user";
import { createHash } from "@/utils/createHash";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { allRoles } from "@/constants/all-roles";
import toast from "react-hot-toast";
import { SubmitButton } from "./submit-button";

export function AddANewUserForm() {
  const [password, setPassword] = useState("");
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(addANewUser, initialState);

  function generatePassword() {
    const hash = createHash();
    setPassword(hash);
  }

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    }
  }, [state?.success, state?.message]);

  return (
    <form
      action={dispatch}
      className="max-w-3xl w-full p-8 my-8 mx-4 bg-white text-gray-800 border border-gray-200 rounded-lg flex flex-col gap-6"
    >
      <div className="relative flex items-center justify-center w-full">
        <Button
          as={Link}
          href="/admin"
          className="absolute left-0"
          radius="full"
          isIconOnly
        >
          <PiCaretLeft />
        </Button>
        <h1 className="text-2xl font-semibold">Add a new user</h1>
      </div>
      <p className="text-sm text-center text-gray-600">
        Here you can add a new user to the system.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            name="email"
            label="E-mail address"
            placeholder="Enter an e-mail address"
            className="w-full"
          />
          {state?.errors?.email?.map((error: string) => (
            <span key={error} className="text-red-500 text-sm">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-center align-center gap-2">
            <Input
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              type="text"
              placeholder="Enter a password"
              className="w-full"
            />
            <Button
              type="button"
              onClick={generatePassword}
              color="primary"
              className="h-full py-5"
            >
              <PiPassword />
            </Button>
          </div>
          {state?.errors?.password?.map((error: string) => (
            <span key={error} className="text-red-500 text-sm">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            name="company"
            label="Company"
            placeholder="Enter a company"
            className="w-full"
          />
          {state?.errors?.company?.map((error: string) => (
            <span key={error} className="text-red-500 text-sm">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter a phone number"
            className="w-full"
          />
          {state?.errors?.phoneNumber?.map((error: string) => (
            <span key={error} className="text-red-500 text-sm">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:grid grid-cols-2">
          <div className="flex flex-col gap-2">
            <Input
              name="firstName"
              label="First Name"
              placeholder="Enter a first name"
            />
            {state?.errors?.firstName?.map((error: string) => (
              <span key={error} className="text-red-500 text-sm">
                {error}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Enter a last name"
            />
            {state?.errors?.lastName?.map((error: string) => (
              <span key={error} className="text-red-500 text-sm">
                {error}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Access to portals:
          </span>
          {state?.errors?.roles?.map((error: string) => (
            <span key={error} className="text-red-500 text-sm">
              {error}
            </span>
          ))}

          <ul className="flex flex-col gap-2 py-2 px-1">
            {allRoles.map((role) => (
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
          </ul>
        </div>
      </div>

      <SubmitButton title="Add a new user" color="primary" />
    </form>
  );
}
