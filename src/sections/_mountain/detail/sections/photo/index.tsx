import FilterAndTag from './c/filter';
import PostMediaList from './c/post-media';

export default function MtDetailPhoto({initialTab}: {initialTab: string}) {
  return (
    <>
      <FilterAndTag initialTab={initialTab} />
      <PostMediaList />
    </>
  );
}
