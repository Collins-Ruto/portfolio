// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        const token = req.nextauth.token
        console.log("middleware token : ", token);

        if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin")
            return NextResponse.redirect(
                new URL("/login", req.url)
            );
        if (req.nextUrl.pathname.startsWith("/student") && token?.role !== "student")
            return NextResponse.redirect(
                new URL("/login", req.url)
            );
        if (req.nextUrl.pathname.startsWith("/teacher") && token?.role !== "teacher")
            return NextResponse.redirect(
                new URL("/login", req.url)
            );
        if (req.nextUrl.pathname.startsWith("/page") && !["teacher", "admin"].includes(token?.role as string))
            return NextResponse.redirect(
                new URL("/login", req.url)
            );
        // message=You Are Not Authorized!
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                console.log("authorized token : ", token);
                return !!token
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/student/:path*", "/teacher/:path*", "/page/:path*", "/calender"],
};

