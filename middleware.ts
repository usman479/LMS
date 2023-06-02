// import { NextResponse } from "next/server";

// import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
export {default} from 'next-auth/middleware'

// const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://www.yoursite.com', 'https://yoursite.com'] :
//     ['http://localhost:3000', 'https://www.google.com/']

// export function middleware(request: Request) {

//     // const regex = new RegExp('/api/*');
//     // if(regex.test(request.url))
//     const origin = request.headers.get('origin');
//     console.log("here: ",origin);

//     // || !origin
//     if(origin && !allowedOrigins.includes('origin') ){
//         return new NextResponse(null,{
//             status:400,
//             statusText:"Bad Request",
//             headers:{
//                 'Content-Type':'text/plain'
//             }
//         })
//     }

//     if (request.url.includes('/api/echo')) {
//         console.log("middleware");
//         console.log(request.method);
//         console.log(request.url);


//         return NextResponse.next();
//     }


// }

// // export const config = {
// //     matcher: '/api/:path*'
// // }

// export async function middleware(req: NextRequest) {
//     const token = req.cookies.get('user-token')?.value;
//     const verifiedToken = token && await verifyAuth(token).catch(err => {
//         console.log(err)
//     })

//     if(req.nextUrl.pathname.startsWith('/login') && !verifiedToken){
//         return;
//     }

//     if(req.url.includes('/login') && verifiedToken){
//         return NextResponse.redirect(new URL('/dashboard',req.url))
//     }

//     // const url = req.url;
//     if(!verifiedToken) {
//         return NextResponse.redirect(new URL('/login',req.url))
//     }

// }

export const config = {
    matcher: ['/dashboard','/','/my/:path*']
}
