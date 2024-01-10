import {Prisma} from '@prisma/client';
import {PhotoGetQueryRawType, PostGetQueryRawTypeTry} from '../type';

export const transformPosts = (rawPosts: ReturnType<typeof mergeRawPhotoManyWithSqlResults>) =>
  rawPosts.map((post) => ({
    id: post.Post_id,
    content: post.Post_content,
    createdAt: post.Post_createdAt,
    updatedAt: post.Post_updatedAt,
    deletedAt: post.Post_deletedAt,
    mtFacilityId: post.Post_mtFacilityId,
    userId: post.Post_userId,
    parentId: post.Post_parentId,
    activityDate: post.Post_activityDate,
    mtId: post.Post_mtId,
    mtTrailheadId: post.Post_mtTrailheadId,
    User: {
      id: post.User_id,
      name: post.User_name,
      userName: post.User_userName,
      iconThumbnail: post.User_iconThumbnail,
      iconOriginal: post.User_iconOriginal,
      createdAt: post.User_createdAt,
      updatedAt: post.User_updatedAt,
      deletedAt: post.User_deletedAt,
      email: post.User_email,
      password: post.User_password,
      image: post.User_image,
    },
    Photo: post.Photo?.map((photo) => ({
      id: photo.id,
      postId: photo.postId,
      type: photo.type,
      original: photo.original,
      thumbnail: photo.thumbnail,
      width: photo.width,
      height: photo.height,
      uploadStatus: photo.uploadStatus,
      title: photo.title,
      order: photo.order,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
      deletedAt: photo.deletedAt,
    })),
  }));

export type PostTransformedType = {
  id: number;
  content: string;
  createdAt: Date;
  User: {
    id: number;
    name: string | null;
    userName: string | null;
    iconThumbnail: string | null;
    iconOriginal: string | null;
  };
};

export function mergeRawPhotosWithSqlResults(photosSqlResult: PhotoGetQueryRawType[], rawPhotos: Prisma.PhotoGetPayload<{}>[]) {
  return photosSqlResult.map((photo) => {
    const targetPhoto = rawPhotos.find((rawPhoto) => rawPhoto.postId === photo.Post_id);
    if (!targetPhoto) return photo;
    return {
      ...photo,
      Photo_id: targetPhoto?.id,
      Photo_postId: targetPhoto?.postId,
      Photo_type: targetPhoto?.type || 'PHOTO',
      Photo_original: targetPhoto?.original,
      Photo_thumbnail: targetPhoto?.thumbnail,
      Photo_width: targetPhoto?.width,
      Photo_height: targetPhoto?.height,
      Photo_uploadStatus: targetPhoto?.uploadStatus,
    };
  });
}
export function mergeRawPhotoManyWithSqlResults(photosSqlResult: PostGetQueryRawTypeTry[], rawPhotos: Prisma.PhotoGetPayload<{}>[]) {
  return photosSqlResult.map((photo) => {
    const targetPhotos = rawPhotos.filter((rawPhoto) => rawPhoto.postId === photo.Post_id);

    return {
      ...photo,
      Photo: targetPhotos.map((targetPhoto) => ({
        ...targetPhoto,
      })),
    };
  });
}
