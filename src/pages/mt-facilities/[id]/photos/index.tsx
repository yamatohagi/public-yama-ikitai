import MainLayout from 'src/layouts/main';
import MtDetailPhoto from 'src/sections/_mt-facility/detail/sections/photo';

MtPhotoPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtPhotoPage() {
  return <MtDetailPhoto />;
}
