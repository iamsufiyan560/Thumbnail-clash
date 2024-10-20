import Login from "@/components/auth/Login";
import React from "react";

import Image from "next/image";
import Link from "next/link";

export default async function login() {
  return (
    <div className="grid relative lg:grid-cols-12 h-screen">
      <Link
        href="/"
        className="absolute     items-center gap-4 flex top-2 left-4 "
      >
        <Image
          className="bg-sky-500 rounded-full"
          src="/logo.png"
          width={80}
          height={80}
          alt="img"
        />
        <div className="bg-white rounded-xl px-4 py-1">
          <p className="font-extrabold  text-4xl bg-gradient-to-r from-sky-400 to-green-500 text-transparent bg-clip-text  ">
            Clash
          </p>
        </div>
      </Link>

      <div className="hidden lg:block col-span-6 bg-yellow-50">
        <div className="flex   justify-center h-screen items-center ">
          <Image
            className="w-full h-screen object-cover "
            src="/home.jpg"
            width={600}
            height={500}
            alt="img"
          />
        </div>
      </div>
      <div className="lg:col-span-6 bg-fuchsia-50 flex justify-center items-center h-screen  ">
        <Login />
      </div>
    </div>
  );
}
