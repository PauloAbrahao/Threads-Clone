interface CommunityCardProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

interface ParentInfo {
  authorName: string;
  authorId: string;
  authorThreadId: string;
}

interface Author {
  _id: string;
  image: string;
  name: string;
}

interface Community {
  id: string;
  name: string;
  image: string;
}

interface ThreadsToRenderProps {
  _id: string;
  text: string;
  author: string | Author;
  community: Community | null;
  children: ThreadsToRenderProps[];
  createdAt: string;
  __v: number;
  liked: boolean;
  likeCount: number;
}

interface ThreadCardProps {
  id: string;
  currentUserId: string;
  parentId: string | null;
  parentAuthorId?: string | undefined;
  parentName?: string | undefined;
  content: string;
  author: {
    name: string;
    image: string;
    _id: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likeCount?: number;
  userLiked?: string;
}

interface UserCardProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

interface AccountProfileProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

interface CommentProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

interface DeleteThreadProps {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

interface DropdownProps {
  id: string;
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

interface PaginationProps {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

interface ProfileHeaderProps {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
}

interface Result {
  name: string;
  image: string;
  id: string;
  _id?: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
    liked: boolean;
    likeCount: number;
  }[];
}

interface ThreadsTabProps {
  tabValue: string;
  currentUserId: string;
  accountId: string;
  accountType: string;
}

interface UpdateUserProps {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

interface CreateThreadProps {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export type {
  CommunityCardProps,
  ThreadCardProps,
  UserCardProps,
  AccountProfileProps,
  CommentProps,
  DeleteThreadProps,
  DropdownProps,
  PaginationProps,
  ProfileHeaderProps,
  ThreadsTabProps,
  Result,
  UpdateUserProps,
  CreateThreadProps,
  ParentInfo,
  ThreadsToRenderProps,
};
