"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/app/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
    >
      {pending ? "Creating account..." : "Sign Up"}
    </button>
  );
}

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUp, null);

  return (
    <div className="max-w-md mx-auto mt-8">
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
        {state?.error && (
          <div className="text-red-500 text-sm">{state.error}</div>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
