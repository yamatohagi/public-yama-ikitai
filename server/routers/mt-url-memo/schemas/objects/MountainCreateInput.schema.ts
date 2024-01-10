import {z} from 'zod';

export const MtUrlMemo = z.object({
  name: z.string(),
  url: z.string(),
});

const Schema = z.object({
  MtUrlMemo: z.array(MtUrlMemo),
});

export const MtUrlMemoSchema = Schema;
