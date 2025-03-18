'use client';

import { signout } from "../actions/auth";

export default function Page() {
  return (
    <div>
      <p>Customer Dashboard</p>
      <button onClick={() => signout()}>Sign Out</button>
    </div>
  )
}