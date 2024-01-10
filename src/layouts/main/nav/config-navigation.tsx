// routes
import {paths} from 'src/routes/paths';
import {css} from 'styled-system/css';
import Iconify from 'src/components/iconify';
import {NavItemBaseProps} from './types';

export const pageLinks = [
  {
    order: '4',
    subheader: 'Common',
    items: [
      {title: '404 Error', path: paths.page404.path},
      {title: '500 Error', path: paths.page500.path},
    ],
  },
];

export const navConfig: NavItemBaseProps[] = [
  {title: 'ホーム', path: '/', icon: <Iconify icon="ant-design:home-filled" width={25} className={css({mb: 1})} />},
  {
    title: '探す',
    // icon: <NextImage src="/assets/icons/custom/mountain_active.svg" alt="Icon" width={23} height={23} />,
    icon: <Iconify icon="ri:menu-search-line" width={28} className={css({mb: 1})} />,
    path: '/search',
    children: [
      {
        cover: 'public/assets/logo/vimeo.svg',
        subheader: '',
        items: [
          {title: '登山口', path: paths.trailhead.index.path, icon: <Iconify icon="icon-park-solid:road-sign" className={css({mb: 1})} />},
          {title: '山', path: paths.mountain.index.path, icon: <Iconify icon="foundation:mountains" className={css({mb: 1})} />},
          {title: '小屋', path: paths.mtFacility.index.path, icon: <Iconify icon="game-icons:hut" className={css({mb: 1})} />},
        ],
      },
    ],
  },
  {
    title: '登録する',
    // icon: <NextImage src="/assets/icons/custom/mountain_active.svg" alt="Icon" width={23} height={23} />,
    icon: <Iconify icon="entypo:new-message" className={css({mb: 1, ml: 1})} />,
    path: '/create',
    children: [
      {
        cover: 'public/assets/logo/vimeo.svg',
        subheader: '',
        items: [
          {title: '登山口', path: paths.trailhead.create.path, icon: <Iconify icon="icon-park-solid:road-sign" className={css({mb: 1})} />},
          {title: '山', path: paths.mountain.create.path, icon: <Iconify icon="foundation:mountains" className={css({mb: 1})} />},
          {title: '小屋', path: paths.mtFacility.create.path, icon: <Iconify icon="game-icons:hut" className={css({mb: 1})} />},
        ],
      },
    ],
  },
  {icon: <Iconify icon="uil:signin" className={css({mb: 1, ml: 1})} />, title: 'ログイン', path: '/api/auth/signin'},
  {
    icon: <Iconify icon="uil:signout" className={css({mb: 1, ml: 1})} />,
    title: 'ログアウト',
    path: '/api/auth/signout',
  },
  {
    title: 'コンソール',
    path: `/console`,
    icon: <Iconify icon="material-symbols:admin-panel-settings-rounded" width={25} className={css({mb: 1})} />,
  },
];
