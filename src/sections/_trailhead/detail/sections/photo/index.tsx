import FilterAndTag from './c/filter';
import PostMediaList from './c/post-media-list';

export default function TrailheadDetailPhoto({initialTab}: {initialTab: string}) {
  return (
    <>
      <FilterAndTag initialTab={initialTab} />
      <PostMediaList />
    </>
  );
}
