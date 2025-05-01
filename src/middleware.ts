import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Not logged in -> redirect to /signin
  if (!session) {
    const newUrl = new URL('/signin', req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  const url = req.nextUrl.pathname;
  const userRole = session.role; // assuming role is included in the token

  // Role-based access control
  if (url.startsWith("/cus_dashboard") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (url.startsWith("/des_dashboard") && userRole !== "DESIGNER") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cus_dashboard",
    "/cus_dashboard/:path*",
    "/des_dashboard",
    "/des_dashboard/:path*"
  ],
};
