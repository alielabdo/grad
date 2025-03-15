import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await fetch(`${req.nextUrl.origin}/api/auth/session`).then((res) => res.json());

  if (!session?.user) {
    const newUrl = new URL('/signin', req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};