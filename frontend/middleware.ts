import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF6d2FsQG1sa3IuY29tIiwidHlwZSI6IlVTRVIiLCJpYXQiOjE3NTE3OTc0MDUsImV4cCI6MTc1MTg4MzgwNX0.s1sQHXb6r3Ri0Vmf6OY3RgPj6WHqtkq905YQrvSIzVc";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  cookieStore.set("token", DEMO_TOKEN, {
    path: "/api",
    httpOnly: true,
    secure: true,
  });

  console.log(`Middleware triggered for path: ${pathname}`);

  // If the route is public, allow access
  if (!pathname.startsWith("/dashboard")) {
    console.log(`Public path accessed: ${pathname}`);
    return NextResponse.next();
  }

  const token = cookieStore.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    console.log(`No token found for path: ${pathname}`);
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname); // optional: return after login
    return NextResponse.redirect(loginUrl);
  }
  console.log(`Protected path accessed: ${pathname}`);

  return NextResponse.next();
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
