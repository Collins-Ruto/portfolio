// export { default } from "next-auth/middleware";
// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";
// import { getSession } from 'next-auth/react';


// export default withAuth(
//     // `withAuth` augments your `Request` with the user's token.
//     function middleware(req) {
//         console.log("middleware token : ", req.nextauth.token);

//         if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
//             return NextResponse.rewrite(
//                 new URL("/login?message=You Are Not Authorized!", req.url)
//             );
//         if (req.nextUrl.pathname.startsWith("/student") && req.nextauth.token?.role !== "student")
//             return NextResponse.rewrite(
//                 new URL("/login", req.url)
//             );
//         if (req.nextUrl.pathname.startsWith("/teacher") && req.nextauth.token?.role !== "teacher")
//             return NextResponse.rewrite(
//                 new URL("/login", req.url)
//             );
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => {
//                 console.log("authorized token : ", token);
//                 return (false)
//             },
//         },
//     }
// );

// export const config = {
//     matcher: ["/admin/:path*", "/student/:path*", "/teacher/:path*"],
// };

// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//     // `withAuth` augments your `Request` with the user's token.
//     function middleware(req) {
//         console.log("middle token", req.nextauth.token)
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => token?.role === "admin",
//         },
//     }
// )

// export const config = { matcher: ["/admin"] }

import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
    console.log("middleware call")
    const { pathname } = request.nextUrl;
    const protectedPaths = ["/admin"];
    const matchesProtectedPath = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );
    if (matchesProtectedPath) {
        const token = await getToken({ req: request });
        if (!token) {
            const url = new URL(`/login`, request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }
        if (token.role !== "admin") {
            const url = new URL(`/login`, request.url);
            return NextResponse.rewrite(url);
        }
    }
    return NextResponse.next();
}

// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/admin/:path*", "/student", "/teacher"] }