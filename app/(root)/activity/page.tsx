import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import {
  fetchUser,
  getActivityLikes,
  getActivityReplies,
} from "@/lib/actions/user.actions";
import { GroupedLikedThreads, LikedThread } from "@/lib/@types/interfaces";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const replies = await getActivityReplies(userInfo._id);
  const likedThreads = await getActivityLikes(userInfo._id);

  var likedThreadsArr: LikedThread[] = [];

  likedThreads.forEach((thread) => {
    thread.likes.forEach((like) => {
      likedThreadsArr.push({
        _id: like.userMongoose?._id,
        name: like.userMongoose?.name,
        image: like.userMongoose?.image,
        parentId: thread._id,
      });
    });
  });

  // Group liked threads by parent ID
  const groupedLikedThreads: GroupedLikedThreads[] = likedThreadsArr.reduce(
    (acc: GroupedLikedThreads[], likedThread: LikedThread) => {
      const existingGroup = acc.find(
        (group: GroupedLikedThreads) => group.parentId === likedThread.parentId
      );

      if (existingGroup) {
        existingGroup.users.push(likedThread);
      } else {
        acc.push({
          parentId: likedThread.parentId || "",
          users: [likedThread],
        });
      }

      return acc;
    },
    []
  );

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {replies.length > 0 ? (
          <>
            {replies.map((reply) => (
              <Link key={reply._id} href={`/thread/${reply.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={reply.author.image}
                    alt="user_logo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {reply.author.name}
                    </span>
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No replies yet</p>
        )}

        {groupedLikedThreads.length > 0 ? (
          <>
            {groupedLikedThreads.map((group) => (
              <Link key={group.parentId} href={`/thread/${group.parentId}`}>
                <article className="activity-card">
                  {group.users.map((likedThread, index) => (
                    <Image
                      key={likedThread._id}
                      src={likedThread?.image || ""}
                      alt="user_logo"
                      width={20}
                      height={20}
                      className={`${
                        index !== 0 && "-ml-4"
                      } rounded-full object-cover`}
                    />
                  ))}
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {group.users[0].name}
                    </span>
                    liked your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : null}
      </section>
    </>
  );
}

export default Page;
