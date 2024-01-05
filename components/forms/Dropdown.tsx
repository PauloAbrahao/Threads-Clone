"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import DeleteThread from "./DeleteThread";
import { usePathname } from "next/navigation";
import { DropdownProps } from "@/lib/@types/interfaces";

function Dropdown({
  id,
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: DropdownProps) {
  const pathname = usePathname();
  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-slate-300">...</DropdownMenuTrigger>
      <DropdownMenuContent className="border-2 rounded-md border-stone-950 bg-stone-950 px-2 py-1 flex flex-col gap-2">
        <DropdownMenuItem>
          <DeleteThread
            threadId={JSON.stringify(id)}
            currentUserId={currentUserId}
            authorId={authorId}
            parentId={parentId}
            isComment={isComment}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
