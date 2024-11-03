import Register from "@/components/auth/Register";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function register() {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Link
        href="/"
        className="flex lg:bg-clip-text bg-fuchsia-50 items-center gap-4 p-4 lg:absolute lg:top-2 lg:left-4"
      >
        <Image
          className="bg-sky-500 rounded-full"
          src="/logo.png"
          width={80}
          height={80}
          alt="img"
        />
        <div className="bg-white rounded-xl px-4 py-1">
          <p className="font-extrabold text-4xl bg-gradient-to-r from-sky-400 to-green-500 text-transparent bg-clip-text">
            Clash
          </p>
        </div>
      </Link>

      <div className="hidden lg:flex lg:w-1/2 bg-yellow-50">
        <Image
          className="w-full  h-screen object-cover"
          src="/home.jpg"
          width={600}
          height={500}
          alt="img"
        />
      </div>

      <div className="flex-1 bg-fuchsia-50 flex justify-center items-center p-4 lg:p-0">
        <Register />
      </div>
    </div>
  );
}
