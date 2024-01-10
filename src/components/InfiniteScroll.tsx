import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import {css} from 'styled-system/css';

interface InfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  children: React.ReactNode;
}

export const InfiniteScroll = ({fetchNextPage, hasNextPage, isFetchingNextPage, children}: InfiniteScrollProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      {children}
      {hasNextPage && (
        <div ref={ref}>
          {isFetchingNextPage ? (
            <div className={css({width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'})}>
              <CircularProgress />
            </div>
          ) : (
            <div className={css({width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'})}>
              <Button type="button" onClick={fetchNextPage} disabled={isFetchingNextPage} variant="outlined" sx={{width: 150}}>
                もっと見る
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
