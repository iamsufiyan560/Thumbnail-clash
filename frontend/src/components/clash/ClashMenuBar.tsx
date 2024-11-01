"use client";
import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const EditClash = dynamic(() => import("./EditClash"));

import Env from "@/lib/env";
import { toast } from "sonner";
import dynamic from "next/dynamic";

export default function ClashMenuBar({
  clash,
  token,
}: {
  clash: ClashType;
  token: string;
}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/clash/${clash.id}`);
    toast.success("Link copied successfully!");
  };

  return (
    <>
      <Suspense fallback={<p>Loading....</p>}>
        {editOpen && (
          <EditClash
            token={token}
            open={editOpen}
            setOpen={setEditOpen}
            clash={clash}
          />
        )}
      </Suspense>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
