"use client";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticateUser } from "@/actions/authenticate-user";
import { FormError } from "./form-error";
import { Button, Input } from "@nextui-org/react";
import { Loading } from "./loading";
import { SubmitButton } from "./submit-button";

export function LoginForm() {
  const { pending } = useFormStatus();
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(authenticateUser, initialState);

  return (
    <form
      action={dispatch}
      className="max-w-lg p-8 m-4 bg-white text-gray-800 border border-gray-200 rounded-lg flex flex-col justify-center items-center gap-8 md:p-4 md:gap-4"
    >
      <h1 className="text-[1.25rem] font-semibold">
        Livemode Single-Sign-On Portal
      </h1>
      <p className="text-sm">
        This is the general log-in page for your Bundesliga content. After your
        log-in you will be redirected automatically to the various platforms
      </p>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            name="email"
            label="E-mail address"
            placeholder="Enter your e-mail address"
            className="w-full"
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
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            className="w-full"
          />
          {state?.errors?.password?.map((error) => (
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
      {state?.success === false && <FormError errorMessage={state.message} />}
      <SubmitButton color="primary" style="w-full" title="Sign in" />

      <div className="w-full flex flex-col gap-1 items-center">
        <Link href="./forgot-your-password">
          <span className="text-sm text-gray-500 text-center hover:text-gray-800 hover:underline">
            Forgot your password?
          </span>
        </Link>
        <Link href="./request-an-account">
          <span className="text-sm text-gray-500 text-center hover:text-gray-800 hover:underline">
            Request an account
          </span>
        </Link>
      </div>
    </form>
  );
}
