'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { register } from '../actions/auth';
import { useStateContext } from '../contexts/ContextProvider';

export default function Page() {
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined
  );
  const {role,setRole} = useStateContext()

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">

      <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Go Back to Homepage
        </Link>
        
        <h1 className="rounded-lg border-2 border-blue-600 bg-blue-600 px-6 py-1 text-center text-2xl font-bold text-white">
          Sign Up
        </h1>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value={role === "CUSTOMER" ? "/cus_dashboard" : "/des_dashboard"}/>
          
          <div className="relative h-fit">
            <input
              className="w-full rounded-md border border-gray-300 text-sm px-3 pb-1 pt-7 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              type="email"
              name="email"
              required
            />
            <label className="absolute left-3 top-2 text-[12px] text-gray-500">
              Email
            </label>
          </div>

          <div className="relative h-fit">
            <input
              className="w-full rounded-md border border-gray-300 text-sm px-3 pb-1 pt-7 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              type="password"
              name="password"
              required
              minLength={8}
            />
            <label className="absolute left-3 top-2 text-[12px] text-gray-500">
              Password
            </label>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-700">Choose your role</p>
            <div className="flex gap-4">
              
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="CUSTOMER"
                  onChange={() => setRole("CUSTOMER")}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">Customer</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="DESIGNER"
                  onChange={() => setRole('DESIGNER')}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="text-sm text-gray-700">Designer</span>
              </label>
            </div>
          </div>

          <button
            disabled={isPending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isPending ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Have an account?{' '}
            <Link
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>

          {errorMessage && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}