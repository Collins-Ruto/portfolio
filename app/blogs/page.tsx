import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Metadata } from "next";

const Page = async () => {
  const data = await getServerSession(authOptions);

  console.log("user data", data);

  return (
    <div>
      
      <div className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
        <main className="container mx-auto px-4 py-4 md:flex">
         <h1>Blogs</h1>
        </main>
        
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Blogs"
}
