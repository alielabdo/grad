import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!session) {
    const newUrl = new URL('/signin', req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cus_dashboard", "/cus_dashboard/:path*", "/des_dashboard", "/des_dashboard/:path*"],
};