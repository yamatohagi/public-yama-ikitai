import {Prisma} from '@prisma/client';
import {memo} from 'react';
import {Grid} from '@mui/material';
import {css} from 'styled-system/css';
import RatingCustom from 'src/components/ui/RatingCustom';
import Iconify from 'src/components/iconify/Iconify';
import ExpandableContainer from 'src/components/feature/ExpandableContainer';
import AuxiliaryButton from 'src/components/ui/PointButton';
import convertLines from 'src/components/feature/ConvertLines';
import Divider from 'src/components/ui/Divider';
import {useRouter} from 'next/router';
import {useModalState} from 'src/components/provider/useModalStateJotai';
import RoundButton from 'src/components/ui/RoundButton';
import GalleryImages from 'src/components/ui/GalleryImages';
import {useAuth} from 'src/hooks/use-auth';
import {RatingPostModalAtom} from '../rating-post-modal';
import type {EditModalState} from '../edit-modal/state';
import {PostCreateModalState} from '../post-create/state';
import {MtFeatureItemPhotoGet, RatingHistoryGet} from './api';

type MtFeatureItemProps = {
  iconSize?: number;
  ratingText: React.ReactElement;
  featureName: string;
  rating: number | null;
  remark: string | null;
  mtFeatures: Prisma.MountainFeatureGetPayload<{}>;
  mountainName: string;
  editOnClick: ReturnType<typeof EditModalState>['openModal'];
  postCreateOnClick: ReturnType<typeof PostCreateModalState>['openModal'];
};
const MtFeatureItem = ({
  iconSize,
  mtFeatures,
  featureName,
  rating,
  remark,
  ratingText,
  mountainName,
  editOnClick,
  postCreateOnClick,
}: MtFeatureItemProps) => {
  const activeIconPath = `/assets/icons/custom/${featureName}/active.svg`;
  const passiveIconPath = `/assets/icons/custom/${featureName}/passive.svg`;
  const {openModal} = useModalState(RatingPostModalAtom);
  const {userId, loginCheck} = useAuth();
  const router = useRouter();
  const {asPath} = router;
  const {photos} = MtFeatureItemPhotoGet({mtId: mtFeatures.mountainId, hashtags: [featureName?.toString()]}); // 写真取得
  const {data: alreadyPosted} = RatingHistoryGet({userId, featureName}); // すでに投稿しているかどうか判断するためのデータ取得

  /* handle */
  const base = asPath.endsWith('/') ? asPath.slice(0, -1) : asPath;
  const moreButtonPath = `${base}/features/${mtFeatures.id}/images?featureName=${featureName}&mountainName=${mountainName}`;

  return (
    <>
      {/* 名称と情報修正ボタン */}
      <Grid item xs={12} sm={12}>
        <div className={css({display: 'flex', justifyContent: 'space-between', mx: 2})}>
          <span className={css({fontWeight: 'bold', fontSize: '1.1rem', alignItems: 'flex-start'})}>{featureName}</span>
          <AuxiliaryButton title="情報修正" onClick={editOnClick} />
        </div>
      </Grid>
      {/* 評価 */}
      <Grid item xs={12} sm={12}>
        <div className={css({display: 'flex', alignItems: 'center', mx: 2})}>
          <span className={css({fontWeight: 'semibold', fontSize: '1.1rem', color: '#636363'})}>{(rating || 0).toFixed(1)}</span>
          <RatingCustom
            size={iconSize}
            style={{marginTop: '-3px', marginLeft: '0.1rem', marginRight: '0.5rem'}}
            ratingValue={Math.floor(rating || 0)}
            totalRating={3}
            activeIconPath={activeIconPath}
            passiveIconPath={passiveIconPath}
          />
          {mtFeatures.id && featureName && !alreadyPosted && (
            <AuxiliaryButton title=" 投票する" onClick={() => loginCheck() && openModal({mountainFeatureId: mtFeatures.id, featureName})} />
          )}
        </div>
      </Grid>
      {/* 段階の説明 */}
      <Grid item xs={12} sm={12}>
        <div>
          <div className={css({color: '#636363', fontSize: '0.60rem', marginLeft: '-0.3rem', marginTop: '0.3rem', mx: 1})}>{ratingText}</div>
        </div>
      </Grid>
      {/* 写真 */}
      {photos && photos.length > 0 && (
        <Grid item xs={12} sm={12}>
          <GalleryImages photoItems={photos?.slice(0, 4)} row={2} />
        </Grid>
      )}
      {/* 山ノート */}
      {remark && remark !== '' && (
        <Grid item xs={12} sm={12}>
          <div className={css({marginTop: '1.0rem', color: '#636363', mx: 2})}>
            <ExpandableContainer maxHeightInRem={7}>
              <div className={css({backgroundColor: '#EDEDED', borderRadius: '0.5rem'})}>
                <div className={css({p: '0.7rem'})}>
                  <div className={css({display: 'flex', alignItems: 'center'})}>
                    <Iconify icon="ci:note-edit" width={24} />
                    <span className={css({ml: '0.3rem', fontWeight: '700'})}> 山ノート</span>
                  </div>
                  <div className={css({color: '#323232', fontSize: '0.9rem', mt: '0.5rem'})}> {convertLines(remark)}</div>
                </div>
              </div>
            </ExpandableContainer>
          </div>
        </Grid>
      )}
      {/* 投稿ボタンと、もっと見る */}
      <Grid item xs={12} sm={12}>
        <div className={css({display: 'flex', mx: 1, mt: 1.5})}>
          <RoundButton
            text="投稿する"
            icon="ic:outline-add-photo-alternate"
            backgroundColor="#367B9D"
            color="#FFF"
            onClick={postCreateOnClick}
            styleProps={{mr: '0.5rem'}}
          />
          <RoundButton
            text="もっと見る"
            icon="ooui:next-ltr"
            onClick={() => router.push(`${moreButtonPath}`)}
            styleProps={{ml: '0.5rem'}}
            color="#367B9D"
            iconOnRight
          />
        </div>
      </Grid>
      {/* 区切り線 */}
      <Grid item xs={12} sm={12}>
        <Divider className={css({mb: 7})} />
      </Grid>
    </>
  );
};

export default memo(MtFeatureItem);
