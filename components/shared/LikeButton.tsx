"use client";

import {
  dislikeThread,
  isUserLiked,
  likeThread,
} from "@/lib/actions/thread.actions";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const LikeButton = ({
  threadId,
  likeCount,
  currentUserId,
  authorId,
}: {
  threadId: string;
  likeCount?: number;
  currentUserId: string;
  authorId: string;
}) => {
  const [count, setCount] = useState<number>(likeCount || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    // Update state based on thread likes
    setCount(likeCount || 0);

    // Check if the current user already liked this thread
    isUserLiked(threadId, currentUserId)
      .then((result) => setIsLiked(result))
      .catch((error) =>
        console.error("Erro ao verificar like:", error.message)
      );
  }, [likeCount, currentUserId, threadId]);

  const handleLikeButton = async () => {
    try {
      if (isLiked) {
        // If the user already liked the thread, dislike it
        await dislikeThread(threadId, currentUserId);
        setCount((prevCount) => Math.max(prevCount - 1, 0));
      } else {
        // If the user didn't like the thread yet, like it
        await likeThread(threadId, authorId, currentUserId);
        setCount((prevCount) => prevCount + 1);
      }
      setIsLiked(!isLiked); // Set isLiked based on current user action
    } catch (error: any) {
      console.error("Erro ao atualizar like:", error.message);
    }
  };

  return (
    <button onClick={handleLikeButton}>
      <div className="flex flex-row justify-between gap-1 items-center">
        <Image
          src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
          alt={isLiked ? "heart-filled" : "heart-gray"}
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
