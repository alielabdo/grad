'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate } from '../actions/auth';
import { useStateContext } from '../contexts/ContextProvider'; 

export default function Page() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const {role} = useStateContext()
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
        
        <h1 className="rounded-lg border-2 border-blue-600 bg-white px-6 py-1 text-center text-2xl font-bold text-blue-600">
          Sign In
        </h1>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value={role === "CUSTOMER" ? '/cus_dashboard' : '/des_dashboard'} />

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

          <button
            disabled={isPending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-600">
            No account?{' '}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Register
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