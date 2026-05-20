import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/admin/:path*", "/sign-in/:path*", "/sign-up/:path*"],
};
