import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="container">
      <Navbar />
      <div className="text-end mt-4">
        <AddClash user={session?.user!} />
      </div>
    </div>
  );
}
