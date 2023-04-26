// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        console.log("token: ", req.nextauth.token);

        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
            return NextResponse.rewrite(
                new URL("/login?message=You Are Not Authorized!", req.url)
            );
        if (req.nextUrl.pathname.startsWith("/student") && req.nextauth.token?.role !== "student")
            return NextResponse.rewrite(
                new URL("/login?message=You Are Not Authorized!", req.url)
            );
        if (req.nextUrl.pathname.startsWith("/teacher") && req.nextauth.token?.role !== "teacher")
            return NextResponse.rewrite(
                new URL("/login?message=You Are Not Authorized!", req.url)
            );
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/student/:path*", "/teacher/:path*"],
};