import {Grid} from '@mui/material';
import {css} from 'styled-system/css';
import {TrailheadTransformedType} from 'server/routers/mt-to-trail-head/functions/organize';
import Divider from 'src/components/ui/Divider';
import Iconify from 'src/components/iconify/Iconify';
import TextTag from 'src/components/ui/TextTag';

type PostListItemProps = {
  trailhead: TrailheadTransformedType;
  i: number;
};
const PostListItem = ({trailhead, i}: PostListItemProps) => (
  <Grid container>
    <div className={css({ml: '1rem', mt: '1rem', width: '100%'})}>
      {/* 名前 */}
      <Grid item xs={12} sm={12}>
        <div className={css({fontSize: '1rem', color: '#323232', fontWeight: 'bold'})}>{trailhead.name}</div>
      </Grid>

      {/* iconと場所 */}
      <Grid item xs={12} sm={12}>
        <div className={css({fontSize: '0.8rem', color: '#636363', display: 'flex'})}>
          <Iconify icon="mdi:map-marker" width={18} sx={{mr: 0.3}} />
          {trailhead.prefecture} {trailhead.address1} {trailhead.address2}・{trailhead.area.name}
        </div>
      </Grid>

      {/* 登れる主な山 */}
      <Grid item xs={12} sm={12}>
        <div className={css({display: 'flex'})}>
          <span className={css({fontSize: '0.95rem', color: '#323232', fontWeight: 'semibold'})}>登れる主な山：</span>
          {trailhead.mountains &&
            trailhead.mountains?.map((m, i) => (
              <div key={i} className={css({color: '#636363', mr: '0.8rem'})}>
                {m.name}
              </div>
            ))}
        </div>
      </Grid>

      {/* tag表示 */}
      <Grid item xs={12} sm={12}>
        {tagOrganize(trailhead).map((tag, i) => (
          <TextTag key={i} text={tag} bc="#205676" sx={{ml: i === 0 ? 0 : 0.5}} />
        ))}
      </Grid>
    </div>
    <Grid item xs={12} sm={12}>
      <Divider />
    </Grid>
  </Grid>
);

export default PostListItem;

function tagOrganize(params: TrailheadTransformedType) {
  // あらかじめ選択したものをタグにする
  const SET_KEY_VALUES: Partial<Record<keyof TrailheadTransformedType, string>> = {myCarReg: 'マイカー規制有り', toilet: 'トイレ有り'};

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
