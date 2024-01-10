/* eslint-disable import/no-named-as-default */
import {Grid} from '@mui/material';
import {useGlobalState} from 'src/components/provider/useGlobalStore';

import MoreButton from 'src/components/ui/MoreButton';
import ScrollableTabBar from 'src/components/tab/scrollable-tab-bar';
import AroundMountain from 'src/components/around-components/around-mountain';
import AroundMtFacility from 'src/components/around-components/around-mt-facility';
import AroundTrailhead from 'src/components/around-components/around-trailhead';
import {useModal} from 'src/hooks/useModal';
import {alertThenExecute} from 'server/functions/etc';
import Modal from 'src/components/Modal';
import Iconify from 'src/components/iconify';
import AuxiliaryButton from 'src/components/ui/PointButton';
import MtFacilityDetailSkeleton from './skeleton';
import NameInfo from './c/name-info';
import SupplementInfo from './c/supplement-info';
import {MtTrailheadDetailGet} from './api';
import ParkingList from './c/parking-list';
import TableInfo from './c/table-info';
import Access from './c/access';
import ImageAndRemark from './c/image-and-remark';
import PostList from './c/post-list-and-order';
import TrailheadEditModalInner from './c/edit-modal';

export default function MtTrailheadDetail() {
  const {trailhead, id, refetch} = MtTrailheadDetailGet();
  const {openModal: editOpenModal, isOpen: basicInfoEditIsOpen, closeModal} = useModal({});
  const [activeTab] = useGlobalState('trailheadDetailTabValue', 'すべて');
  if (!trailhead) return <MtFacilityDetailSkeleton />;

  return (
    <>
      {/* 編集Modal */}
      {basicInfoEditIsOpen && (
        <Modal open onClose={() => alertThenExecute(closeModal)} dialogProps={{fullWidth: true}} width="95%">
          <TrailheadEditModalInner refetch={refetch} id={id} closeModal={closeModal} />
        </Modal>
      )}

      <Grid container>
        <>
          <NameInfo name={trailhead.name} tags={[]} prefecture={trailhead.prefecture} />

          {/* 編集ボタン */}
          <AuxiliaryButton
            style={{marginRight: '0.9rem'}}
            border={false}
            title={
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Iconify icon="mi:edit" sx={{width: 20, height: 20, ml: 0.9}} />
                編集
              </div>
            }
            onClick={editOpenModal}
          />

          {/* タブ */}
          <Grid item xs={12} sm={12} sx={{mt: 1}}>
            <ScrollableTabBar stateKey="trailheadDetailTabValue" initialTab="すべて" tabs={['すべて', 'アクセス', '駐車場', '基本情報', '投稿']} />
          </Grid>

          {/* 画像のスライド */}
          {['すべて'].includes(activeTab) && <ImageAndRemark images={trailhead.TrailheadToPhoto.map((p) => p.Photo)} remark={trailhead.remark} />}

          {/* もっと見るのボタン */}
          {['すべて'].includes(activeTab) && (
            <MoreButton label="写真をもっと見る" link={`/trailheads/${id}/photos?tab=登山口に関連する写真`} style={{mb: 9}} />
          )}
          {/* Access */}
          {['すべて', 'アクセス'].includes(activeTab) && <Access trailhead={trailhead} />}

          {/* 駐車場 */}
          {['すべて', '駐車場'].includes(activeTab) && <ParkingList parkings={trailhead.Parking} />}

          {/* 基本情報 */}
          {['すべて', '基本情報'].includes(activeTab) && <TableInfo trailhead={trailhead} />}

          {/* 施設補足情報 */}
          {['すべて'].includes(activeTab) && <SupplementInfo remark={trailhead.remark} />}

          {/* 投稿 */}
          {['投稿'].includes(activeTab) && <PostList />}

          {/* 周辺の山 */}
          <AroundMountain lat={trailhead.lat} lng={trailhead.lng} />
          {/* 周辺の山小屋 */}
          <AroundMtFacility lat={trailhead.lat} lng={trailhead.lng} />
          {/* 周辺の登山口 */}
          <AroundTrailhead lat={trailhead.lat} lng={trailhead.lng} />
        </>
      </Grid>
    </>
  );
}
