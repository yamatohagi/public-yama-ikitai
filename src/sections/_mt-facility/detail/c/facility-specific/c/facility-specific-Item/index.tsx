import {Grid} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import RatingCustom from 'src/components/ui/RatingCustom';
import {css} from 'styled-system/css';
import DynamicTable, {TableData} from 'src/components/ui/DynamicTable';
import {useRouter} from 'next/router';
import AuxiliaryButton from 'src/components/ui/PointButton';
import type {MtFacilityDetailGet} from 'src/sections/_mt-facility/detail/api';
import {MtFacility} from '@prisma/client';
import {useModalState} from 'src/components/provider/useModalStateJotai';
import RoundButton from 'src/components/ui/RoundButton';
import GalleryImages from 'src/components/ui/GalleryImages';
import FacilitySpecificPostCreateModalInner from 'src/components/mt-facility/specifics/post-create';
import Modal from 'src/components/Modal';
import {useModal} from 'src/hooks/useModal';
import {AlreadyHistory, FacilitySpecificsItemImageGet} from './api';
import RatingModal, {NameInputModalAtom} from './c/rating-modal';
import {FacilitySpecificItemEditModalAtom} from './c/edit-modal/atom';
import FacilitySpecificEditModalInner from './c/edit-modal';

interface FacilitySpecificsItemProps {
  editProps: {
    flagColumName: keyof MtFacility;
    remarkColumName: keyof MtFacility;
  };
  flag?: number | null;
  title: string;
  icon: string;
  rating?: number | null;
  ratingColumnName: keyof MtFacility;
  type?: string | null;
  qty?: string | null;

  remark?: string | null;
  tableDate?: TableData;
  refetch: NonNullable<ReturnType<typeof MtFacilityDetailGet>>['refetch'];
  id: number;
  hashtagId: number;
  mtFacilityName: string;
}

export const FacilitySpecificsItem = ({
  flag,
  title,
  icon,
  rating,
  ratingColumnName,
  type,
  qty,
  remark,
  tableDate,
  refetch,
  editProps,
  id,
  hashtagId,
  mtFacilityName,
}: FacilitySpecificsItemProps) => {
  const {data: photos, refetch: photosRefetch, isLoading: photosIsLoading} = FacilitySpecificsItemImageGet(title);
  const {data: ratingHistory, refetch: ratingHistoryRefetch} = AlreadyHistory(title, ratingColumnName);

  const allRefetch = () => {
    refetch();
    ratingHistoryRefetch();
    photosRefetch();
  };
  const {openModal: ratingOpenModal, isOpen: ratingIsOpen} = useModalState(NameInputModalAtom);
  const {openModal: editOpenModal, isOpen: editIsOpen} = useModalState(FacilitySpecificItemEditModalAtom);
  const {openModal: postCreateOpenModal, isOpen: postCreateModalIsOpen, closeModal: postCreateCloseModal} = useModal({});

  const router = useRouter();

  const {asPath} = router;
  const base = asPath.endsWith('/') ? asPath.slice(0, -1) : asPath;
  const moreButtonPath = `${base}/feature/images?name=${title}&mtFacilityName=${mtFacilityName}`;

  return (
    <>
      {/* 編集モーダル */}
      {editIsOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <FacilitySpecificEditModalInner refresh={allRefetch} title={title} mtFacilityId={id} idName={title} editProps={editProps} />
        </Modal>
      )}

      {/* 投稿モーダル */}
      {postCreateModalIsOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <FacilitySpecificPostCreateModalInner
            viewTitle={title}
            mtFacility={{id, hashtagName: title}}
            refresh={allRefetch}
            closeModal={postCreateCloseModal}
          />
        </Modal>
      )}

      {ratingIsOpen && <RatingModal title={title} refresh={allRefetch} />}

      <Grid item xs={12} sm={12} sx={{mt: 3}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {/* icon外トイレ */}
          <div style={{display: 'flex'}}>
            <div
              style={{
                display: 'flex',
                marginTop: '0.2rem',
                marginLeft: '1rem',
              }}
            >
              <Iconify icon={icon} width={24} style={{color: '#367B9D'}} />
              <div
                style={{
                  marginLeft: '0.7rem',

                  color: '#323232',
                  fontWeight: '700',
                }}
              >
                {title}
              </div>
            </div>
            {/* icon外トイレ */}
            {/* 丸とかバツとか   */}
            <div style={{marginLeft: '0.5rem'}}>
              <div
                style={{
                  width: '2rem',
                  height: '2rem',

                  background: '#EDEDED',

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {(flag === null || flag === undefined) && (
                  <Iconify icon="ic:baseline-minus" width={28} style={{color: '#636363', verticalAlign: 'middle'}} />
                )}
                {flag === 0 && <Iconify icon="ic:baseline-close" width={28} style={{color: '#636363', verticalAlign: 'middle'}} />}
                {flag === 1 && <Iconify icon="material-symbols:circle-outline" width={28} style={{color: '#367B9D', verticalAlign: 'middle'}} />}
              </div>
            </div>
          </div>

          {/* タイプと個数 */}
          <div style={{marginRight: '1.9rem'}}>
            {/*  これ流石にいらないだろ2023/11/01 */}
            {/* {type && (
              <div>
                <span style={{fontSize: '0.9rem', color: '#636363'}}>タイプ：</span>
                <span style={{fontSize: '0.9rem', color: '#636363'}}>{type}</span>
              </div>
            )}
            {qty && (
              <div style={{}}>
                <span style={{fontSize: '0.9rem', color: '#636363'}}>数：</span>
                <span style={{fontSize: '0.9rem', color: '#636363'}}>{qty}</span>
              </div>
            )} */}
            <AuxiliaryButton
              border={false}
              title={
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Iconify icon="mi:edit" sx={{width: 20, height: 20, mr: 0.2}} />
                  編集
                </div>
              }
              onClick={() =>
                editOpenModal({
                  mtFacilityId: Number(id),
                  idName: title,
                  editProps,
                })
              }
            />
          </div>
        </div>
      </Grid>
      {true && (
        <Grid item xs={12} sm={12} sx={{mt: 0.5}}>
          <div style={{display: 'flex'}}>
            <div style={{color: '#323232', fontWeight: '700', marginTop: 1.5, marginLeft: '1rem'}}>
              気入り度：
              <span
                className={css({
                  fontWeight: 'semibold',
                  fontSize: '1rem',
                  color: '#636363',
                })}
              >
                {rating !== null && rating !== undefined ? rating.toFixed(1) : '未投票'}
              </span>
            </div>

            <RatingCustom
              style={{marginTop: '-3px', marginLeft: '0.1rem', marginRight: '0.5rem', marginBottom: '0.6rem'}}
              ratingValue={rating}
              activeIconPath="/assets/icons/custom/active.svg"
              passiveIconPath="/assets/icons/custom/passive.svg"
              size={20}
              totalRating={3}
            />
            {!ratingHistory && (
              <AuxiliaryButton
                title=" 投票する"
                onClick={() =>
                  ratingOpenModal({
                    mtFacilityId: Number(id),
                    idName: title,
                    ratingColumnName,
                  })
                }
              />
            )}
          </div>
        </Grid>
      )}

      {/* 写真 */}
      {((photos && photos.length > 0) || photosIsLoading) && (
        <Grid item xs={12} sm={12}>
          <GalleryImages photoItems={photos?.slice(0, 4)} row={2} />
        </Grid>
      )}

      {tableDate && (
        <Grid item xs={12} sm={12} sx={{mt: '0.5rem'}}>
          <div className={css({ml: '1rem', mr: '1rem'})}>
            <DynamicTable data={tableDate} />
          </div>
        </Grid>
      )}
      {remark && (
        <Grid item xs={12} sm={12} sx={{mt: '0.8rem'}}>
          {/* コレはいけい */}
          <div
            style={{
              backgroundColor: '#EDEDED',
              borderRadius: '0.5rem',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
          >
            <div
              style={{
                padding: '0.5rem',
                color: '#323232',
              }}
            >
              <div className={css({display: 'flex', alignItems: 'center', color: '#636363'})}>
                <Iconify icon="ci:note-edit" width={24} />
                <span className={css({ml: '0.3rem', fontWeight: '700'})}> 山ノート</span>
              </div>
              {remark}
            </div>
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
            onClick={() => {
              postCreateOpenModal({});
            }}
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
      <Grid item xs={12} sm={12} sx={{mt: 0}}>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '1.0em'}}>
          <div
            style={{
              width: '92%',
              height: '0.08rem',
              background: '#EDEDED',
            }}
          />
        </div>
      </Grid>
    </>
  );
};
