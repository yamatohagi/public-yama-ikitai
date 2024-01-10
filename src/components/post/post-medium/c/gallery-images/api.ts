// import {uploadStatusType} from 'generated/schema/zod/inputTypeSchemas/uploadStatusSchema';
// import {trpc} from 'src/utils/trpc';

// export function GalleryImageIskUploaded(photoId: number, uploadStatus: uploadStatusType) {
//   const {data} = trpc.photo.findMany.useQuery(
//     {
//       where: {
//         id: photoId,
//         uploadStatus: 'uploaded',
//       },
//     },
//     {
//       enabled: uploadStatus === 'uploading',
//       refetchInterval: 2000,
//     }
//   );
//   return data?.length === 1;
// }

// その画像が動画かどうかって本当に必要なの？圧縮できたタイミングで普通にdbから取得すればいいんじゃない？
// もしリアルタイム反映が必要ならこれ使えば
