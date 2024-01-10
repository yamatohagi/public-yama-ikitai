import {Grid} from '@mui/material';
import {css} from 'styled-system/css';
import PostImages from 'src/sections/_post/detail/c/post-images';
import type {MtFacilityDetailGet} from '../../api';

type ImageAndRemarkProps = {
  images?: NonNullable<ReturnType<typeof MtFacilityDetailGet>['mtFacility']>['MtFacilityToPhoto'][0]['Photo'][];
  remark?: string | null;
};
const ImageAndRemark = ({images, remark}: ImageAndRemarkProps) => {
  return (
    <>
      <Grid item xs={12} sm={12}>
        <PostImages images={images} />
      </Grid>

      <Grid item xs={12} sm={12} sx={{mt: 4}} style={{display: 'flex'}}>
        <div className={css({marginTop: '0.8rem', fontSize: '0.8rem', color: '#323232', letterSpacing: '0.1rem', ml: '1rem'})}>{remark}</div>
      </Grid>
    </>
  );
};

export default ImageAndRemark;
