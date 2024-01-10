export const paths = {
  mountain: {
    index: {
      path: '/mountains',
      title: '山 検索結果',
    },
    create: {
      path: '/mountains/create',
      title: '山 登録',
    },
    search: {
      path: '/mountains',
      title: '山 検索結果',
    },
  },
  post: {
    index: {
      path: '/posts',
      title: '投稿',
    },
  },
  user: {
    maypage: {
      path: '/mypage',
      title: 'マイページ',
    },

    index: {
      path: '/users',
      title: 'ユーザ',
    },
  },
  trailhead: {
    create: {
      path: '/trailheads/create',
      title: '登山口 登録',
    },
    index: {
      path: '/trailheads',
      title: '登山口',
    },
  },
  mtTrailhead: {
    index: {
      path: '/trailheads',
      title: 'Mountains',
    },
    create: {
      path: '/mt-trailheads',
      title: 'Mountains',
    },
  },
  mtFacility: {
    index: {
      path: '/mt-facilities',
      title: '小屋・宿泊・休憩',
    },
    create: {
      path: '/mt-facilities/create',
      title: 'Mountains',
    },
  },
  login: {
    path: '/api/auth/signin',
    title: 'ログイン',
  },
  auth: {
    signIn: {
      path: '/api/auth/signin',
      title: 'ログイン',
    },
    signUp: {
      path: '/api/auth/signup',
      title: 'ログイン',
    },
    emailSetting: {
      path: '/auth/email-setting',
      title: 'メールアドレスを設定してください',
    },
  },
  console: {
    index: {
      path: '/console',
      title: 'コンソール',
    },
  },
  page404: {
    path: '/404',
    title: '404',
  },
  page500: {
    path: '/500',
    title: '500',
  },
  notice: {
    path: '/notice',
    title: '通知',
  },
};
