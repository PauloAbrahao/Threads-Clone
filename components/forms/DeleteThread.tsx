"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";

import { Button } from "../ui/button";
import { DeleteThreadProps } from "@/lib/@types/interfaces";

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: DeleteThreadProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <Button
      className="flex flex-row gap-3 justify-between bg-stone-950 hover:bg-transparent p-0"
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment) {
          router.push("/");
        }
      }}
    >
      <p className="text-light-1 text-sm">Delete thread</p>
      <Image
        src="/assets/delete.svg"
        alt="delete"
        width={18}
        height={18}
        className="cursor-pointer object-contain"
      />
    </Button>
  );
}

export default DeleteThread;
