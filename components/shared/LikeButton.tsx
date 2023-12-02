"use client";

import { likeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const LikeButton = ({ threadId }: { threadId: string }) => {
  // State to track the liked status
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  // console.log('threadId', threadId);

  // Handler function for liking a thread
  const handleLikeButton = async (threadId: string) => {
    setIsLiked(!isLiked);

    const { liked, likeCount } = await likeThread(threadId, isLiked);
    setCount(likeCount);
  };

  useEffect(() => {}, [isLiked, count]);

  return (
    <button onClick={() => handleLikeButton(threadId)}>
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
