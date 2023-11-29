import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import {
  fetchUser,
  fetchUserPosts,
  getReplies,
} from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { Result, ThreadsTabProps } from "@/lib/@types/interfaces";
import { currentUser } from "@clerk/nextjs";

async function ThreadsTab({
  value,
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) {
  let result: Result;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect("/");
  }

  let threadsToRender = result.threads;
  let parentId;

  // Check if the value is "replies" and fetch replies using getReplies
  if (value === "replies") {
    const { threadsReplies, parent } = await getReplies(userInfo._id);
    threadsToRender = threadsReplies;
    parentId = parent;
  }

  let parent = {
    authorName: "",
    authorId: "",
  };

  parentId?.forEach((thread) => {
    parent.authorName = thread.author.name;
    parent.authorId = thread.author.id;
  });

  return (
    <section className="mt-9 flex flex-col gap-10">
      {threadsToRender.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          parentInfo={parent}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
