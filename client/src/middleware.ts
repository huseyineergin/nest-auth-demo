import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/protected"];

const jwtAtSecret = new TextEncoder().encode(process.env.JWT_AT_SECRET);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) return redirect(request, "/sign-in");

    try {
      jwtVerify(accessToken, jwtAtSecret);
      return NextResponse.next();
    } catch {
      return redirect(request, "/sign-in");
    }
  }

  return NextResponse.next();
}

function redirect(request: NextRequest, to: string) {
  const url = new URL(to, request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
};
