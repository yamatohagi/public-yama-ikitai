import {trpc} from 'src/utils/trpc';

export const GetMtList = (inputValue: string) => {
  // これ本当はまとめてpostと一緒に取得したいSQLがんばれ
  const {data} = trpc.mountains.findManyOld.useQuery({
    where: {
      name: {
        contains: inputValue,
      },
    },
  });

  const options = data?.map((d) => {
    return {
      label: d.name,
      value: d.id,
    };
  });
  return {
    options,
  };
};
