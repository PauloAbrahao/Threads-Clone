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
  userLiked,
}: {
  threadId: string;
  likeCount?: number;
  currentUserId: string;
  userLiked: string;
}) => {
  const [count, setCount] = useState<number>(likeCount || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    // Atualiza o estado com o número mais recente de likes do banco de dados
    setCount(likeCount || 0);

    // Verifica se o usuário atual curtiu o post
    isUserLiked(threadId, currentUserId)
      .then((result) => setIsLiked(result))
      .catch((error) =>
        console.error("Erro ao verificar like:", error.message)
      );
  }, [likeCount, userLiked, currentUserId, threadId]);

  // Handler function for liking a thread
  const handleLikeButton = async (threadId: string, currentUserId: string) => {
    try {
      await likeThread(threadId, currentUserId);

      // Atualiza o estado com o novo valor de likeCount e marca como curtido
      setCount((prevCount) => prevCount + 1);
      setIsLiked(true);
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

      // Atualiza o estado com o novo valor de likeCount e marca como não curtido
      setCount((prevCount) => Math.max(prevCount - 1, 0));
      setIsLiked(false);
    } catch (error: any) {
      console.error("Erro ao atualizar deslike:", error.message);
    }
  };

  return (
    <button
      onClick={
        isLiked
          ? () => handleDislikeButton(threadId, currentUserId)
          : () => handleLikeButton(threadId, currentUserId)
      }
    >
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
