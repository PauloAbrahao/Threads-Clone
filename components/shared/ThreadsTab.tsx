import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts, getReplies } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { ParentInfo, Result, ThreadsTabProps } from "@/lib/@types/interfaces";

async function ThreadsTab({
  tabValue,
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) {
  let result: Result;

  if (accountType === "Community" && tabValue === "threads") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  let threadsToRender = result.threads;
  let parentData;

  if (!result) {
    redirect("/");
  }

  // Check if the value is "replies" and fetch replies using getReplies
  if (tabValue === "replies") {
    if (result._id) {
      const { threadsReplies, parentAuthor } = await getReplies(result._id);
      threadsToRender = threadsReplies;
      parentData = parentAuthor;
    }
  }

  let parent: ParentInfo[] = [];

  parentData?.forEach((thread) => {
    const parentInfo: ParentInfo = {
      authorName: thread.author.name,
      authorId: thread.author.id,
      authorThreadId: thread.id,
    };

    parent.push(parentInfo);
  });

  return (
    <section className="mt-9 flex flex-col gap-10">
      {threadsToRender.map((thread) => {
        let parentName: string | undefined;
        let parentId: string | undefined;

        parent.forEach((parentInfo) => {
          if (
            thread.parentId &&
            thread.parentId.toString() === parentInfo.authorThreadId
          ) {
            parentName = parentInfo.authorName;
            parentId = parentInfo.authorId;
          }
        });

        return (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            parentAuthorId={parentId}
            parentName={parentName}
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
            likeCount={thread.likeCount}
            liked={thread.liked}
          />
        );
      })}
    </section>
  );
}

export default ThreadsTab;
