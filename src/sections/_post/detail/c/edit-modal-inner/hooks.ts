import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';
import {defaultInstance} from 'src/service/zodHelper';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useAtom} from 'jotai';

function GetSchema() {
  const postCreateSchema = z.object({
    content: z.string().max(300, '備考は300文字以内で入力してください'),
    mtId: z.number().nullable(),
    mtFacilityId: z.number().nullable(),
    trailheadId: z.number().nullable(),
    hashtagIds: z.array(z.string()).nullable(),
  });
  return postCreateSchema;
}

export type PostInput = z.infer<ReturnType<typeof GetSchema>>;

export default function usePostCreateForm() {
  const [, setImages] = useAtom(ImagesAndLabelAtom);
  const router = useRouter();
  const postId = Number(router.query.id);
  const scheme = GetSchema();
  const utils = trpc.useUtils();
  const f = utils.post.findFirstForEdit.fetch;

  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),
    defaultValues: async (): Promise<ReturnType<typeof getDefaultValue>> => {
      const result = await f(
        {id: postId},
        {
          staleTime: 0,
          // これupdate後のdataからキャッシュに入れるといいかも
        }
      );
      // imageをセット
      const resultImages =
        result?.Photo.map((v, imageIdx) => ({
          blobFile: null,
          previewUrl: v.original,
          dbPhotoId: v.id,
          width: v.width,
          type: v.type,
          height: v.height,
          labels:
            v.PhotoLabel.map((v, labelIdx) => ({
              x: v.labelLeft || 0,
              y: v.labelTop || 0,
              index: labelIdx,
              mtId: v.Mountain?.id || 0,
              text: v.Mountain?.name || '',
              imageIdx,
              labelIdx,
            })) || [],
        })) || [];
      setImages(resultImages || []);

      const dValue: (typeof scheme)['_type'] = {
        content: result?.content || '',
        mtId: result?.Mountain?.id || null,
        mtFacilityId: result?.MtFacility?.id || null,
        trailheadId: result?.MtTrailhead?.id || null,
        hashtagIds: result?.PostToHashtag.map((v) => v.hashtagId.toString()) || [],
      };
      return dValue;
    },
    // defaultValues: {
    //   content: '',
    //   mtId: null,
    //   mtFacilityId: null,
    //   trailheadId: null,
    //   hashtagIds: [],
    // },
  });

  return MtFacilityFormMethods;
}

export function getDefaultValue(scheme: ReturnType<typeof GetSchema>) {
  return {
    ...defaultInstance<typeof scheme>(scheme),
  };
}
