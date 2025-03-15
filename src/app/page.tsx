'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-4xl space-y-8 text-center">
        
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Welcome to <span className="text-blue-600">DesignCollab</span>
        </h1>

        <p className="text-lg text-gray-600">
          A collaborative design platform where creativity meets opportunity.
        </p>

        <div className="space-y-6">
          <p className="text-gray-700">
            Whether you're a <span className="font-semibold text-blue-600">designer</span> looking for exciting projects or a{' '}
            <span className="font-semibold text-blue-600">customer</span> in need of stunning designs, DesignCollab connects you with the right people to bring your ideas to life.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-left">
              <h2 className="text-xl font-semibold text-gray-900">For Designers</h2>
              <p className="mt-2 text-gray-600">
                Showcase your skills, collaborate with customers, and get paid for your creativity.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-left">
              <h2 className="text-xl font-semibold text-gray-900">For Customers</h2>
              <p className="mt-2 text-gray-600">
                Request custom designs, collaborate with talented designers, and bring your vision to life.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="/signup"
            className="w-full rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className="w-full rounded-md bg-white px-6 py-3 text-sm font-medium text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}