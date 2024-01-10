import {useModal} from 'src/hooks/useModal';

export function EditModalState() {
  const state = useModal<{
    remarkColumName: RemarkColumName | null;
    featureName: string | null;
  }>({
    remarkColumName: null,
    featureName: null,
  });
  return state;
}

type RemarkColumName =
  | 'seaOfCloudsRemark'
  | 'starrySkyRemark'
  | 'sunriseRemark'
  | 'sunsetRemark'
  | 'widthPeakRemark'
  | 'trailViewRemark'
  | 'ptarmiganRemark'
  | 'ptarmiganRemark'
  | null;
