import {Grid} from '@mui/material';
import {css} from 'styled-system/css';
import Divider from 'src/components/ui/Divider';
import Iconify from 'src/components/iconify/Iconify';
import TextTag from 'src/components/ui/TextTag';
import Image from 'next/image';
import {transformTrailheads} from 'server/routers/mt-facility/functions/organize';

type PostListItemProps = {
  mtFacility: ReturnType<typeof transformTrailheads>[number];
  i: number;
};
const PostListItem = ({mtFacility, i}: PostListItemProps) => (
  <Grid container>
    <div className={css({position: 'relative', mt: '1.0rem'})}>
      {/* 名前 */}
      <Grid item xs={12} sm={12}>
        <div className={css({color: '#323232', ml: '1rem', fontSize: '1rem', fontWeight: 'bold'})}>{mtFacility.name}</div>
      </Grid>

      {/* iconと場所 */}
      <Grid item xs={12} sm={12}>
        <div className={css({display: 'flex', width: '100%'})}>
          <div className={css({ml: '1rem', display: 'flex', color: '#636363', fontSize: '0.8rem'})}>
            <Iconify icon="mdi:map-marker" width={18} sx={{mr: 0.3}} />
            {mtFacility.prefecture} {mtFacility.address1} {mtFacility.address2}・{mtFacility.area.name}
          </div>
          <div className={css({color: '#323232', fontSize: '0.8rem', marginLeft: 'auto', marginRight: '1rem'})}>
            標高：{mtFacility.listElevation}m
          </div>
        </div>
      </Grid>
      {/* 画像 */}
      <Grid item xs={12} sm={12}>
        <Grid container>
          {/* 画像 */}
          <Grid item xs={5} sm={5}>
            <div
              style={{
                marginTop: '3%',
                marginLeft: '3%',

                overflow: 'hidden',
                width: '100%',
                height: '110px',
                flexShrink: 0,
                borderRadius: 3,
              }}
            >
              <Image src={mtFacility.photos[0]?.thumbnail} alt="500" width={300} height={3} />
            </div>
          </Grid>
          {/* 登れる主な山 */}
          {/* todo:これ横はみ出る */}
          <Grid item xs={7} sm={7} style={{display: 'flex', flexDirection: 'column'}}>
            <div className={css({fontWeight: 'semibold', ml: 2, mt: '0.5rem', color: '#323232'})}>登れる主な山：</div>
            <div className={css({margin: '0 0.5rem 0 0.5rem'})}>
              {mtFacility.mountains &&
                mtFacility.mountains.slice(0, 3).map((m, i) => (
                  <div key={i} className={css({color: '#636363', display: 'inline'})}>
                    {m.name}
                    {i < mtFacility.mountains.slice(0, 3).length - 1 && ', '}
                  </div>
                ))}
            </div>
          </Grid>
        </Grid>
      </Grid>

      {/* tag表示 */}
      <Grid item xs={12} sm={12}>
        <div className={css({ml: '0.5rem'})}>
          {tagOrganize(mtFacility).map((tag, i) => (
            <TextTag key={i} text={tag} bc="#205676" sx={{ml: i === 0 ? 0 : 0.5}} />
          ))}
        </div>
      </Grid>
    </div>
    <Grid item xs={12} sm={12}>
      <Divider />
    </Grid>
  </Grid>
);

export default PostListItem;

function tagOrganize(params: ReturnType<typeof transformTrailheads>[number]) {
  // あらかじめ選択したものをタグにする
  const SET_KEY_VALUES: Partial<Record<keyof ReturnType<typeof transformTrailheads>[number], string>> = {};

  const keys = getKeys(SET_KEY_VALUES);

  // keyに合致して、値がundefinedか0でないものを抽出
  const tags = keys.filter((key) => params[key] !== undefined && params[key] !== 0 && params[key] !== 'なし');
  // valueに変換
  const values = tags.map((tag) => SET_KEY_VALUES[tag]);
  // undefinedを除外
  return values.filter((v) => v !== undefined) as string[];
}

function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
