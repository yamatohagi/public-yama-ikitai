import {Grid} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import SiteTitle from 'src/components/ui/SiteTitle';
import MoreButton from 'src/components/ui/MoreButton';
import {css} from 'styled-system/css';
import {useGlobalState} from 'src/components/provider/useGlobalStore';
import ScrollableTabBar from 'src/components/tab/scrollable-tab-bar';
import AroundMountain from 'src/components/around-components/around-mountain';
import AroundMtFacility from 'src/components/around-components/around-mt-facility';
import AroundTrailhead from 'src/components/around-components/around-trailhead';
import {useModal} from 'src/hooks/useModal';
import Modal from 'src/components/Modal';
import {alertThenExecute} from 'server/functions/etc';
import AuxiliaryButton from 'src/components/ui/PointButton';
import {useAuth} from 'src/hooks/use-auth';
import {Provider} from 'jotai';
import {ImageSlideshow} from './c/image';
import MountainTrailHead from './c/trailhead';
import MountainFacility from './c/mt-facility';
import MtFeature from './c/mt-feature';
import Memo from './c/memo';
import Description from './c/description';
import GetMountain from './api';
import DetailSkeleton from './skeleton';
import PostList from './c/post-list-and-order';
import AfterClimbMeal from './c/after-climb-meal';
import AfterClimbSpa from './c/after-climb-spa';
import MtEditModalInner from './c/edit-modal';

export default function MountainDetail() {
  const {mountain, isLoading, mtId} = GetMountain();
  const {openModal: editOpenModal, isOpen: basicInfoEditIsOpen, closeModal} = useModal({});
  const [activeTab] = useGlobalState('mountainDetailTabValue', 'すべて');
  const {loginCheck} = useAuth();

  if (!mountain && isLoading) {
    return <DetailSkeleton />;
  }
  if (!mountain) return <>ありません</>;

  // ここでmtを取得する†
  return (
    <>
      {/* 編集Modal */}
      {basicInfoEditIsOpen && (
        <Modal open onClose={() => alertThenExecute(closeModal)} dialogProps={{fullWidth: true}} width="95%">
          <MtEditModalInner mtId={mountain.id} closeModal={closeModal} />
        </Modal>
      )}
      <Grid container>
        {/* タイトル */}
        <SiteTitle name={mountain?.name} />
        <AuxiliaryButton
          style={{marginRight: '0.9rem'}}
          border={false}
          title={
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Iconify icon="mi:edit" sx={{width: 20, height: 20, ml: 0.9}} />
              編集
            </div>
          }
          onClick={(v) => loginCheck() && editOpenModal(v)}
        />
        {/* 場所 */}
        <Grid item xs={12} sm={12} sx={{mt: 1.0}} style={{display: 'flex', color: '#636363'}}>
          <Iconify icon="mdi:map-marker" width={19} className={css({marginRight: 0.3, ml: 1})} />
          <div style={{fontSize: '0.9rem'}}>{mountain?.prefecture}、 中央アルプス市</div>
        </Grid>
        {/* タブ */}
        <Grid item xs={12} sm={12} sx={{mt: 1}}>
          <ScrollableTabBar
            stateKey="mountainDetailTabValue"
            initialTab="すべて"
            tabs={['すべて', '登山口', '宿泊地', 'みんメモ', '下山メシ', '温泉', '投稿']}
          />
        </Grid>
        {/* 画像のスライド */}
        {['すべて'].includes(activeTab) && <ImageSlideshow />}

        {/* もっと見るのボタン */}
        {['すべて'].includes(activeTab) && (
          <MoreButton label="写真をもっと見る" link={`/mountains/${mtId}/photos?tab=すべて&name=${mountain.name}`} />
        )}

        {/* 説明（写真をもっと見るの下） */}
        {['すべて'].includes(activeTab) && <Description description={mountain.description} />}

        {/* 天の川とか一つ一つの特徴 */}

        {['すべて'].includes(activeTab) && (
          <Provider>
            <MtFeature />
          </Provider>
        )}

        {/* 登山口 */}
        {['すべて', '登山口'].includes(activeTab) && <MountainTrailHead />}

        {/* 宿泊・休憩 */}
        {['すべて', '宿泊地'].includes(activeTab) && <MountainFacility />}

        {/* メモ(URL付きのやつ) */}
        {['すべて', '登山口', '宿泊地', 'みんメモ'].includes(activeTab) && <Memo />}

        {/* 下山飯 */}
        {['下山メシ'].includes(activeTab) && <AfterClimbMeal />}

        {/* 温泉 */}
        {['温泉'].includes(activeTab) && <AfterClimbSpa />}

        {/* 投稿 */}
        {['投稿'].includes(activeTab) && <PostList />}

        {/* 周辺の山 */}
        <AroundMountain lat={mountain.lat} lng={mountain.lng} />
        {/* 周辺の山小屋 */}
        <AroundMtFacility lat={mountain.lat} lng={mountain.lng} />
        {/* 周辺の登山口 */}
        <AroundTrailhead lat={mountain.lat} lng={mountain.lng} />
      </Grid>
    </>
  );
}
