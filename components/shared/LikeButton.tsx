"use client";

import { dislikeThread, likeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import React, { useState } from "react";

const LikeButton = ({
  threadId,
  likeCount,
  currentUserId,
  userLiked,
}: {
  threadId: string;
  likeCount?: number;
  currentUserId: string;
  userLiked: string;
}) => {
  // State to track the liked status

  const [count, setCount] = useState<number>(likeCount || 0);

  // Handler function for liking a thread
  const handleLikeButton = async (threadId: string, currentUserId: string) => {
    try {
      await likeThread(threadId, currentUserId);

      setCount(count);
    } catch (error: any) {
      console.error("Erro ao atualizar like:", error.message);
    }
  };

  // Handler function for unliking a thread
  const handleDislikeButton = async (
    threadId: string,
    currentUserId: string
  ) => {
    try {
      await dislikeThread(threadId, currentUserId);

      setCount(count);
    } catch (error: any) {
      console.error("Erro ao atualizar deslike:", error.message);
    }
  };

  return (
    <button
      onClick={
        userLiked.toString() === currentUserId.toString()
          ? () => handleDislikeButton(threadId, currentUserId)
          : () => handleLikeButton(threadId, currentUserId)
      }
    >
      <div className="flex flex-row justify-between gap-1 items-center">
        <Image
          src={
            userLiked === currentUserId
              ? "/assets/heart-filled.svg"
              : "/assets/heart-gray.svg"
          }
          alt={userLiked === currentUserId ? "heart-filled" : "heart-gray"}
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
        <p className="text-slate-500">{count}</p>
      </div>
    </button>
  );
};

export default LikeButton;
