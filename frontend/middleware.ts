import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const USER_PATH_KEYS = ["/dashboard", "/dashboard/tasks", "/dashboard/profile"];
const PROVIDER_PATH_KEYS = [
  "/dashboard",
  "/dashboard/tasks",
  "/dashboard/skills",
  "/dashboard/offers",
  "/dashboard/profile",
  "/dashboard/task-progress"
];

async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return jwtVerify(token, secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  if (token) {
    if (pathname.startsWith("/dashboard")) {
      try {
        const verifiedToken = await verifyToken(token);

        if (
          verifiedToken.payload.type === "USER"
            ? !USER_PATH_KEYS.some((key) => pathname === key)
            : !PROVIDER_PATH_KEYS.some((key) => pathname === key)
        ) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }else{
          return NextResponse.next();
        }
      } catch (error) {
        const response = NextResponse.next();
        response.cookies.delete("token").delete("refreshToken");

        return response;
      }
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (pathname.startsWith("/dashboard")) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: [
    /*
      Match all routes except:
      - static files (/_next/, /images/, etc.)
      - public paths defined above
    */
    "/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)",
  ],
};
