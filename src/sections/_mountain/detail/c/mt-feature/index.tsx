import {memo} from 'react';
import {Grid} from '@mui/material';
import Modal from 'src/components/Modal';
import {useAuth} from 'src/hooks/use-auth';
import RatingPostModalModal from './c/rating-post-modal';
import MtFeatureItem from './c/mt-feature-item';
import MtFeatureEditModalInner from './c/edit-modal';
import {EditModalState} from './c/edit-modal/state';
import PostCreateModalInner from './c/post-create';
import {PostCreateModalState} from './c/post-create/state';
import {MtFeatureGet} from './api';

function MtFeature() {
  const editModalState = EditModalState();
  const postCreateModalState = PostCreateModalState();
  const {loginCheck} = useAuth();

  /* データ取得 */
  const {data: mtFeatures} = MtFeatureGet();

  /* Handle */
  const editOnClick = (remarkColumName: NonNullable<ReturnType<typeof EditModalState>['modalProps']['remarkColumName']>, featureName: string) => {
    editModalState.openModal({
      remarkColumName,
      featureName,
    });
  };
  const PostCreateOnClick = (hashTag: string) => {
    postCreateModalState.openModal({
      viewTitle: hashTag,
      hashTag,
    });
  };

  return (
    <>
      {/* 情報編集モーダル */}
      {editModalState.isOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <MtFeatureEditModalInner modalState={editModalState} />
        </Modal>
      )}
      {/* お気に入り度モーダル */}
      <RatingPostModalModal />

      {/* 投稿モーダル */}
      {postCreateModalState.isOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <PostCreateModalInner modalState={postCreateModalState} />
        </Modal>
      )}

      <Grid item xs={12} sm={12} sx={{mt: 5}}>
        {/* mtFeatures足したけどない時全く出なくなる */}
        {mtFeatures && mtFeatures ? (
          <Grid container>
            <MtFeatureItem
              mountainName={mtFeatures.Mountain.name}
              iconSize={24}
              mtFeatures={mtFeatures}
              featureName="登山道の展望"
              rating={mtFeatures.trailViewRating}
              remark={mtFeatures.trailViewRemark}
              ratingText={
                <>
                  【0】展望なし 主に森林内など、景色が見えない区間が多い。 <br />
                  【1】限定的展望 特定の地点からのみ少しの景色が楽しめる。 <br />
                  【2】部分的展望 登山道に沿って時折良い眺めのポイントがある。 <br />
                  【3】広い展望 大部分のルートから広範囲の景色を堪能できる。
                </>
              }
              editOnClick={() => loginCheck() && editOnClick('trailViewRemark', '登山道の展望')}
              postCreateOnClick={() => loginCheck() && PostCreateOnClick('登山道の展望')}
            />
            <MtFeatureItem
              mountainName={mtFeatures.Mountain.name}
              iconSize={28}
              mtFeatures={mtFeatures}
              featureName="雲海"
              rating={mtFeatures.seaOfCloudsRating}
              remark={mtFeatures.seaOfCloudsRemark}
              ratingText={<>【0】見れない/【1】ほとんど見れない/【2】運が良ければ見れる/【3】見れる</>}
              editOnClick={() => loginCheck() && editOnClick('seaOfCloudsRemark', '雲海')}
              postCreateOnClick={() => loginCheck() && PostCreateOnClick('雲海')}
            />
            <MtFeatureItem
              mountainName={mtFeatures.Mountain.name}
              iconSize={19}
              mtFeatures={mtFeatures}
              featureName="天の川"
              rating={mtFeatures.starrySkyRating}
              remark={mtFeatures.starrySkyRemark}
              ratingText={<>【0】見れない/【1】ほとんど見れない/【2】運が良ければ見れる/【3】見れる</>}
              editOnClick={() => loginCheck() && editOnClick('starrySkyRemark', '天の川')}
              postCreateOnClick={() => loginCheck() && PostCreateOnClick('天の川')}
            />
            <MtFeatureItem
              mountainName={mtFeatures.Mountain.name}
              iconSize={22}
              mtFeatures={mtFeatures}
              featureName="雷鳥"
              rating={mtFeatures.ptarmiganRating}
              remark={mtFeatures.ptarmiganRemark}
              ratingText={<>【0】見れない/【1】ほとんど見れない/【2】運が良ければ見れる/【3】見れる</>}
              editOnClick={() => loginCheck() && editOnClick('ptarmiganRemark', '雷鳥')}
              postCreateOnClick={() => loginCheck() && PostCreateOnClick('雷鳥')}
            />
            <MtFeatureItem
              mountainName={mtFeatures.Mountain.name}
              iconSize={24}
              mtFeatures={mtFeatures}
              featureName="ご来光"
              rating={mtFeatures.sunriseRating}
              remark={mtFeatures.sunriseRemark}
              ratingText={<>【0】見れない/【1】ほとんど見れない/【2】運が良ければ見れる/【3】見れる</>}
              editOnClick={() => loginCheck() && editOnClick('sunriseRemark', 'ご来光')}
              postCreateOnClick={() => loginCheck() && PostCreateOnClick('ご来光')}
            />
            <MtFeatureItem
              mountainName={mtFeatures.Mountain.name}
              mtFeatures={mtFeatures}
              featureName="夕日"
              rating={mtFeatures.sunsetRating}
              remark={mtFeatures.sunsetRemark}
              ratingText={<>【0】見れない/【1】ほとんど見れない/【2】運が良ければ見れる/【3】見れる</>}
              editOnClick={() => loginCheck() && editOnClick('sunsetRemark', '夕日')}
              postCreateOnClick={() => loginCheck() && PostCreateOnClick('夕日')}
            />
            <MtFeatureItem
              mountainName={mtFeatures.Mountain.name}
              mtFeatures={mtFeatures}
              featureName="山頂の広さ"
              rating={mtFeatures.widthPeakRating}
              remark={mtFeatures.widthPeakRemark}
              ratingText={<>【0】見れない/【1】ほとんど見れない/【2】運が良ければ見れる/【3】見れる</>}
              editOnClick={() => loginCheck() && editOnClick('widthPeakRemark', '山頂の広さ')}
              postCreateOnClick={() => loginCheck() && PostCreateOnClick('山頂の広さ')}
            />
          </Grid>
        ) : (
          <>ロード中</>
        )}
      </Grid>
    </>
  );
}

export default memo(MtFeature);
