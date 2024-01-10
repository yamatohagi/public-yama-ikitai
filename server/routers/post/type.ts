import {Prisma} from '@prisma/client';

// Prismaで生成されたMountain型を使用
// Prismaで生成された型を使用

type User = Prisma.UserGetPayload<{}>;
type Photo = Prisma.PhotoGetPayload<{}>;
type Post = Prisma.PostGetPayload<{}>;

// 生成した型を基に新しい型を作成

type PhotoKeys = {
  [P in keyof Photo as `Photo_${P}`]: Photo[P];
};

type PostKeys = {
  [P in keyof Post as `Post_${P}`]: Post[P];
};

type UserKeys = {
  [P in keyof User as `User_${P}`]: User[P];
};

type PhotoArrayKeys = {
  [P in keyof Photo as `Photo_${P}s`]: Array<Photo[P]>;
};

export type PostGetQueryRawType = PhotoArrayKeys & PostKeys & UserKeys;

export type PostGetQueryRawTypeTry = PostKeys & UserKeys;

export type PhotoGetQueryRawType = PhotoKeys & PostKeys;

type ReplyType = Prisma.PostGetPayload<{
  select: {
    Replies: {
      include: {
        Replies: {
          select: {
            content: true;
            userId: true;
            id: true;
            parentId: true;
            activityDate: true;
            User?: true;
          };
        };
        User: {
          select: {
            id: true;
            name: true;
            userName: true;
            iconThumbnail: true;
            image: true;
          };
        };
      };
    };
  };
}>['Replies'][number] & {status?: string};

export type NestedReplyType = ReplyType['Replies'][number] & {status?: string};

// FindManyRepliesTypeを更新
export type FindManyRepliesType = {
  Replies: (ReplyType & {Replies?: NestedReplyType[]})[];
};

export type FindManyUserProfilePostType = Prisma.PostGetPayload<{
  include: {
    User: {
      select: {
        id: true;
        name: true;
        userName: true;
        iconThumbnail: true;
        iconOriginal: true;
      };
    };
    Photo: {
      select: {
        postId: true;
        type: true;
        original: true;
        thumbnail: true;
        width: true;
        height: true;
        title: true;
      };
      take: 1;
    };
  };
}>;
