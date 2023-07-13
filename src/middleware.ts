// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        const token = req.nextauth.token
        console.log("middleware token : ", token);
        console.log("middleware path : ", req.nextUrl.pathname);
       
        if (req.nextUrl.pathname === "/blogs/add" && !(token))
            return NextResponse.redirect(
                new URL(`/api/auth/signin`, req.url)
            );
        
        if (req.nextUrl.pathname === "/blogs/add" && !(token?.name === "Collins Ruto"))
            return NextResponse.redirect(
                new URL(`/blogs`, req.url)
            );
        
        if (req.nextUrl.pathname === "/login") {
            return NextResponse.redirect(
                new URL("/api/auth/signin", req.url)
            )
        }
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
    matcher: [  "/login", "/blogs/add"],
};

