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

interface ThreadCardProps {
  id: string;
  currentUserId: string;
  parentInfo: {
    authorName: string;
    authorId: string;
  };
  parentId: string | null;
  content: string;
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
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
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
  }[];
}

interface ThreadsTabProps {
  value: string;
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
  CreateThreadProps
};
