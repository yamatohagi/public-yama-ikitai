import {MtFacility} from '@prisma/client';
import {createModalAtom} from 'src/components/provider/useModalStateJotai';

export const FacilitySpecificItemEditModalAtom = createModalAtom<{
  mtFacilityId: number;
  idName?: string;
  editProps: {
    flagColumName: keyof MtFacility;
    remarkColumName: keyof MtFacility;
  };
}>();
