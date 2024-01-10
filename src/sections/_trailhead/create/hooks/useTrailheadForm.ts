import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {TrailheadCreateInputObjectSchema} from 'server/routers/trailhead/objects/TrailheadCreateInput.schema';
import {defaultInstance} from 'src/service/zodHelper';
import {z} from 'zod';

export type TrailheadInput = z.infer<typeof TrailheadCreateInputObjectSchema>;

export function GetTrailheadSchema() {
  return TrailheadCreateInputObjectSchema;
}

export default function useMountainForm() {
  const scheme = GetTrailheadSchema();
  const mountainFormMethods = useForm({
    resolver: zodResolver(scheme),
    defaultValues: defaultInstance<typeof scheme>(scheme),
  });

  return mountainFormMethods;
}

export function getTrailheadDefaultValue(scheme: ReturnType<typeof GetTrailheadSchema>) {
  return {
    ...defaultInstance<typeof scheme>(scheme),
  };
}
