"use client";

import { likeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import React, { useState } from "react";

const LikeButton = ({
  threadId,
  likeCount,
  liked,
  currentUserId,
}: {
  threadId: string;
  likeCount?: number;
  liked?: boolean;
  currentUserId: string;
}) => {
  // State to track the liked status
  const [isLiked, setIsLiked] = useState<boolean>(liked || false);
  const [count, setCount] = useState<number>(likeCount || 0);

  // Handler function for liking a thread
  const handleLikeButton = async (threadId: string, currentUserId: string) => {
    const { newLiked, newLikeCount } = await likeThread(threadId, currentUserId);
    setIsLiked(newLiked);
    setCount(newLikeCount);
  };

  return (
    <button onClick={() => handleLikeButton(threadId, currentUserId)}>
      <div className="flex flex-row justify-between gap-1 items-center">
        <Image
          src={!isLiked ? "/assets/heart-gray.svg" : "/assets/heart-filled.svg"}
          alt="heart-gray"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
        <p className="text-slate-500	">{count}</p>
      </div>
    </button>
  );
};

export default LikeButton;
