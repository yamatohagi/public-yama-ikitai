/* eslint-disable import/no-named-as-default */
import {Grid} from '@mui/material';
import {useGlobalState} from 'src/components/provider/useGlobalStore';
import MoreButton from 'src/components/ui/MoreButton';
import ScrollableTabBar from 'src/components/tab/scrollable-tab-bar';
import AroundMountain from 'src/components/around-components/around-mountain';
import AroundMtFacility from 'src/components/around-components/around-mt-facility';
import AroundTrailhead from 'src/components/around-components/around-trailhead';
import {alertThenExecute} from 'server/functions/etc';
import AuxiliaryButton from 'src/components/ui/PointButton';
import Modal from 'src/components/Modal';
import Iconify from 'src/components/iconify';
import {useModal} from 'src/hooks/useModal';
import MtFacilityDetailSkeleton from './skeleton';
import NameInfo from './c/name-info';
import FacilitySpecific from './c/facility-specific';
import SupplementInfo from './c/supplement-info';
import BasicInfo from './c/basic-info';
import ImageAndRemark from './c/image-and-remark';
import {MtFacilityDetailGet} from './api';
import PostList from './c/post';
import FacilitySpecificEditModalInner from './c/edit-modal';

export default function MtFacilityDetail() {
  const {mtFacility, id, refetch} = MtFacilityDetailGet();
  const [activeTab] = useGlobalState('mtFacilityDetailTabValue', 'すべて');
  const {openModal: basicInfoEditOpen, isOpen: basicInfoEditIsOpen, closeModal} = useModal({});

  if (!mtFacility) return <MtFacilityDetailSkeleton />;

  const MtFacilityType = mtFacility.MtFacilityToMtFacilityType?.map((v) => ({id: v.MtFacilityType.id, name: v.MtFacilityType.name}));
  return (
    <Grid container>
      <>
        {/* 編集Modal */}
        {basicInfoEditIsOpen && (
          <Modal open onClose={() => alertThenExecute(closeModal)} dialogProps={{fullWidth: true}} width="95%">
            <FacilitySpecificEditModalInner refetch={refetch} mtFacilityId={mtFacility.id} closeModal={closeModal} />
          </Modal>
        )}
        <NameInfo name={mtFacility.name} tags={MtFacilityType} prefecture={mtFacility.prefecture} />

        <AuxiliaryButton
          style={{marginRight: '0.9rem'}}
          border={false}
          title={
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Iconify icon="mi:edit" sx={{width: 20, height: 20, ml: 0.9}} />
              編集
            </div>
          }
          onClick={basicInfoEditOpen}
        />

        {/* タブ */}
        <Grid item xs={12} sm={12} sx={{mt: 1}}>
          <ScrollableTabBar stateKey="mtFacilityDetailTabValue" initialTab="すべて" tabs={['すべて', '基本情報', '投稿']} />
        </Grid>

        {/* 画像のスライド */}
        {['すべて'].includes(activeTab) && (
          <ImageAndRemark images={mtFacility.MtFacilityToPhoto.map((photoRelation) => photoRelation.Photo)} remark={mtFacility.remark} />
        )}
        {/* もっと見るのボタン */}
        {['すべて'].includes(activeTab) && (
          <MoreButton label="写真をもっと見る" link={`/mt-facilities/${id}/photos?tab=すべて&name=${mtFacility.name}`} style={{mb: 9}} />
        )}

        {/* 施設の特徴の詳細 例：トイレ⚪︎など */}
        {['すべて'].includes(activeTab) && <FacilitySpecific mtFacility={mtFacility} refetch={refetch} id={id} />}

        {/* 施設補足情報 */}
        {['すべて', '基本情報'].includes(activeTab) && <SupplementInfo remark={mtFacility.remark} />}

        {/* 基本情報 */}
        {['すべて', '基本情報'].includes(activeTab) && <BasicInfo mtFacility={mtFacility} refetch={refetch} />}

        {/* 投稿 */}
        {['投稿'].includes(activeTab) && <PostList />}
        {/* //ここちょっと最適化してみて */}

        {/* 周辺の山 */}
        <AroundMountain lat={mtFacility.lat} lng={mtFacility.lng} />
        {/* 周辺の山小屋 */}
        <AroundMtFacility lat={mtFacility.lat} lng={mtFacility.lng} />
        {/* 周辺の登山口 */}
        <AroundTrailhead lat={mtFacility.lat} lng={mtFacility.lng} />
      </>
    </Grid>
  );
}
