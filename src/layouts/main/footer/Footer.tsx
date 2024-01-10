import {Container, Typography, Grid} from '@mui/material';
import Logo from 'src/components/logo';
import {Fragment, memo} from 'react';
import {regions} from 'src/sections/_post/search/c/prefecture-search-modal';
import {paths} from 'src/routes/paths';

function Footer() {
  const simpleFooter = (
    <>
      <Container sx={{pt: 6.3, pb: 5, textAlign: 'center', backgroundColor: '#f3f3f3'}}>
        <SaunaSearch />
      </Container>
      <Container sx={{pt: 6, pb: 12, textAlign: 'center', backgroundColor: '#367B9D'}}>
        <Grid container spacing={1}>
          <Grid item xs={6} md={4} sx={{mb: 4}}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6" component="div" sx={{mb: 1, color: 'white', textAlign: 'left', ml: 1}}>
                  山を探す
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="caption" component="div" sx={{color: 'white', textAlign: 'left', ml: 1}}>
                  -{'　'}山の検索
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="caption" component="div" sx={{color: 'white', textAlign: 'left', ml: 1}}>
                  -{'　'}現在地から探す
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="caption" component="div" sx={{color: 'white', textAlign: 'left', ml: 1}}>
                  -{'　'}条件から探す
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4} sx={{mb: 3}}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6" component="div" sx={{mb: 1, color: 'white', textAlign: 'left', ml: 1}}>
                  お問い合わせ
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="caption" component="div" sx={{color: 'white', textAlign: 'left', ml: 1}}>
                  -{'　'}総合お問い合わせ
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="caption" component="div" sx={{color: 'white', textAlign: 'left', ml: 1}}>
                  -{'　'}ご意見・ご要望
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} sx={{ml: 1}}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} sx={{textAlign: 'left', ml: 1}}>
                <Typography variant="caption" component="div" sx={{color: 'white'}}>
                  推奨環境
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{textAlign: 'left', ml: 1}}>
                <Typography variant="caption" component="div" sx={{color: 'white'}}>
                  利用規約
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{textAlign: 'left', ml: 1}}>
                <Typography variant="caption" component="div" sx={{color: 'white'}}>
                  お問い合わせ
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{textAlign: 'left', ml: 1}}>
                <Typography variant="caption" component="div" sx={{mb: 5, color: 'white'}}>
                  プライバシーポリシー
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Logo single sx={{mb: 2}} />

        <Typography variant="caption" component="div" sx={{color: 'white'}}>
          © 2023. All rights reserved
        </Typography>
      </Container>
    </>
  );

  // const mainFooter = (
  //   <>
  //     {/* <Divider /> */}
  //     <Container
  //       sx={{
  //         overflow: 'hidden',
  //         py: {xs: 8, md: 10},
  //       }}
  //     />
  //     <Divider />
  //     <Container>
  //       <Stack spacing={2.5} direction={{xs: 'column', md: 'row'}} justifyContent="space-between" sx={{py: 3, textAlign: 'center'}}>
  //         <Typography variant="caption" sx={{color: 'text.secondary'}}>
  //           © 2023. All rights reserved
  //         </Typography>

  //         <Stack direction="row" spacing={3} justifyContent="center">
  //           <Link variant="caption" sx={{color: 'text.secondary'}}>
  //             Help Center
  //           </Link>

  //           <Link variant="caption" sx={{color: 'text.secondary'}}>
  //             Terms of Service
  //           </Link>
  //         </Stack>
  //       </Stack>
  //     </Container>
  //   </>
  // );

  return <footer>{simpleFooter}</footer>;
}

const SaunaSearch: React.FC = () => (
  <Grid container spacing={0}>
    <Grid item xs={12} md={12} sx={{mb: 0}}>
      <Typography variant="body1" color="secondary" fontWeight="bold" sx={{textAlign: 'left'}}>
        都道府県から山を探す
      </Typography>
    </Grid>

    {regions.map((region, i) => (
      <Fragment key={region.name}>
        <Grid item xs={12}>
          <Typography variant="body2" fontWeight="bold" sx={{textAlign: 'left', mt: i === 0 ? 1 : 2}}>
            {region.name}
          </Typography>
        </Grid>

        {region.prefectures.map((prefecture) => (
          <Grid item xs={3} sm={3} md={2} key={prefecture}>
            <a href={`${paths.mountain.index.path}/?area=${prefecture}`} color="#000" target="_blank" rel="noreferrer">
              <Typography variant="caption" style={{textDecoration: 'underline'}}>
                {prefecture}の山
              </Typography>
            </a>
          </Grid>
        ))}
      </Fragment>
    ))}
  </Grid>
);

// メモ化してexport
export default memo(Footer);
