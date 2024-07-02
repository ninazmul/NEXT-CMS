import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRouteMatcher = createRouteMatcher(["/api/:path*"]);

export default clerkMiddleware();

export const config = {
  matcher: [publicRouteMatcher, "/((?!.*\\..*|_next).*)", "/"],
};
