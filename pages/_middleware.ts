import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (protectedPages.includes(pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect(`${origin}/signin`);
    }
  }

  return NextResponse.next();
}
