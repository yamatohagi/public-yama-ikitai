import {Grid} from '@mui/material';
import {Fragment} from 'react';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import type {MtFacility} from '@prisma/client';
import {Provider} from 'jotai';
import {FacilitySpecificsItem} from './c/facility-specific-Item';
import {FacilitySpecificsItemSkeleton} from './c/facility-specific-Item/skeleton';
import type {MtFacilityDetailGet} from '../../api';

const FacilitySpecific = ({
  mtFacility,
  refetch,
  id,
}: {
  mtFacility: NonNullable<ReturnType<typeof MtFacilityDetailGet>>['mtFacility'];
  refetch: NonNullable<ReturnType<typeof MtFacilityDetailGet>>['refetch'];
  id: number;
}) => {
  const facilityData:
    | {
        editProps: {
          flagColumName: keyof MtFacility;
          remarkColumName: keyof MtFacility;
        };
        ratingColumnName: keyof MtFacility;
        flag?: number | null;
        title: string;
        icon: string;
        rating?: number | null;
        type?: string | null;
        qty?: string | null;
        remark?: string | null;
        tableData?: any;
      }[]
    | null = mtFacility
    ? [
        {
          editProps: {
            flagColumName: 'outTFlag',
            remarkColumName: 'outTRemark',
          },
          ratingColumnName: 'outTCleanRating',
          flag: mtFacility.outTFlag,
          title: '外トイレ',
          icon: 'cil:toilet',
          rating: mtFacility.outTCleanRating,
          remark: mtFacility.outTRemark,

          // tableData: [
          //   [
          //     {
          //       key: '料金/一回',
          //       value: '200円',
          //     },
          //   ],
          // ],
        },
        {
          editProps: {
            flagColumName: 'inTFlag',
            remarkColumName: 'inTRemark',
          },
          ratingColumnName: 'inTCleanRating',
          flag: mtFacility.inTFlag,
          title: '内トイレ',
          icon: 'cil:toilet',
          rating: mtFacility.inTCleanRating,
          remark: mtFacility.inTRemark,
          // tableData: [
          //   [
          //     {
          //       key: '山頂まで',
          //       value: 'jjj',
          //     },
          //     {
          //       key: '山頂で',
          //       value: 'jjj',
          //     },
          //   ],
          // ],
        },
        {
          editProps: {
            flagColumName: 'bathSinkFlag',
            remarkColumName: 'bathSinkRemark',
          },
          ratingColumnName: 'bathSinkCleanRating',
          flag: mtFacility.bathSinkFlag,
          title: '洗面台',
          icon: 'mdi:hand-wash-outline',
          rating: mtFacility.bathSinkCleanRating,
          remark: mtFacility.bathSinkRemark,
        },
        {
          editProps: {
            flagColumName: 'talkRoomFlag',
            remarkColumName: 'talkRoomRemark',
          },
          ratingColumnName: 'talkRoomCleanRating',
          flag: mtFacility.talkRoomFlag,
          title: '談話室',
          icon: 'ic:baseline-meeting-room',
          rating: mtFacility.talkRoomCleanRating,
          remark: mtFacility.talkRoomRemark,
        },
        {
          editProps: {
            flagColumName: 'dryRoomFlag',
            remarkColumName: 'dryRoomRemark',
          },
          ratingColumnName: 'dryRoomCleanRating',
          flag: mtFacility.dryRoomFlag,
          title: '乾燥室',
          icon: 'material-symbols:dry-cleaning-outline',
          rating: mtFacility.dryRoomCleanRating,
          remark: mtFacility.dryRoomRemark,
        },
        {
          editProps: {
            flagColumName: 'cafeSpaceRoomFlag',
            remarkColumName: 'cafeSpaceRoomRemark',
          },
          ratingColumnName: 'cafeSpaceRoomCleanRating',
          flag: mtFacility.cafeSpaceRoomFlag,
          title: 'カフェスペース',
          icon: 'mdi:table-chair',
          rating: mtFacility.cafeSpaceRoomCleanRating,
          remark: mtFacility.cafeSpaceRoomRemark,
        },
        // 他の施設・設備データ
      ]
    : null;

  return (
    <>
      <Grid item xs={12} sm={12} sx={{mt: 2}}>
        <div style={{marginLeft: '0.7rem'}}>
          <TitleStartIcon sx={{ml: 0.2}} />
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginLeft: '0.5rem',
            }}
          >
            施設・設備
          </span>
        </div>
      </Grid>
      {facilityData ? (
        facilityData.map((item, index) => (
          <Provider key={index}>
            <FacilitySpecificsItem
              key={index}
              flag={item.flag}
              title={item.title}
              icon={item.icon}
              rating={item.rating}
              ratingColumnName={item.ratingColumnName}
              type={item.type}
              qty={item.qty}
              remark={item.remark}
              tableDate={item.tableData}
              refetch={refetch}
              editProps={item.editProps}
              id={id}
              hashtagId={4}
              mtFacilityName={mtFacility?.name || ''}
            />
          </Provider>
        ))
      ) : (
        <FacilitySpecificsItemSkeleton />
      )}
    </>
  );
};

export default FacilitySpecific;
