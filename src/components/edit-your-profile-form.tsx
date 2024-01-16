"use client";
import { changeYourPassword } from "@/actions/change-your-password";
import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { FormError } from "./form-error";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function ChangeYourPasswordForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(changeYourPassword, initialState);

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state.message);
    }
  }, [state?.message, state?.success]);

  return (
    <form action={dispatch} className="w-full flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Change your password</h1>
        <p className="text-gray-500 text-sm">
          Enter your current password and your new password below.
        </p>
      </div>

      <Input name="currentPassword" label="Current Password" type="password" />
      {state?.errors?.currentPassword &&
        state.errors.currentPassword.map((error) => (
          <p aria-live="polite" key={error} className="text-xs text-red-500">
            {error}
          </p>
        ))}

      <Input name="password" label="New Password" type="password" />
      {state?.errors?.password &&
        state.errors.password.map((error) => (
          <p aria-live="polite" key={error} className="text-xs text-red-500">
            {error}
          </p>
        ))}

      <Input
        name="passwordConfirmation"
        label="Confirm New Password"
        type="password"
      />
      {state?.errors?.passwordConfirmation &&
        state.errors.passwordConfirmation.map((error) => (
          <p aria-live="polite" key={error} className="text-xs text-red-500">
            {error}
          </p>
        ))}

      {state?.success === false && <FormError errorMessage={state.message} />}

      <Button color="primary" type="submit">
        Confirm
      </Button>
    </form>
  );
}
