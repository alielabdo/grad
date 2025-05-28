'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 px-4 py-12">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSg2NSw4NSwxNzAsMC4wMykiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>

      <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-white/90 shadow-lg backdrop-blur-sm">
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">DesignCollab</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              A collaborative design platform where creativity meets opportunity.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-center text-gray-700">
              Whether you're a <span className="font-semibold text-blue-600">designer</span> looking for exciting projects or a{' '}
              <span className="font-semibold text-indigo-600">customer</span> in need of stunning designs, we connect you with the right people.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 text-left shadow-sm transition-all hover:shadow-md">
                <h2 className="text-xl font-semibold text-blue-800">For Designers</h2>
                <p className="mt-3 text-gray-600">
                  Showcase your portfolio, collaborate in real-time, and make impressive designs.
                </p>
                <div className="mt-4 h-1 w-12 rounded-full bg-blue-200"></div>
              </div>

              <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 text-left shadow-sm transition-all hover:shadow-md">
                <h2 className="text-xl font-semibold text-indigo-800">For Customers</h2>
                <p className="mt-3 text-gray-600">
                  Find top designers, manage projects seamlessly, and bring your vision to life.
                </p>
                <div className="mt-4 h-1 w-12 rounded-full bg-indigo-200"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="/signup"
              className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Get Started - It's Free
            </Link>
            <Link
              href="/signin"
              className="w-full transform rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Existing Account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}