import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import type { User } from "@prisma/client";
import Head from "next/head";

const HomePage = async () => {
  const data = await getServerSession(authOptions);
  // const user = data?.user as User;

  console.log("user data", data);

  return (
    <div>
      Home Page
    </div>
  );
};

export default HomePage;
