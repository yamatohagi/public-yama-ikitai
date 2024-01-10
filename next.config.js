module.exports = {
  images: {
    minimumCacheTTL: 31536000,
    // loader: 'custom',
    // loaderFile: './imageLoader.js',
    deviceSizes: [320, 640],
    imageSizes: [50, 256],

    formats: ['image/avif'],
    domains: [
      'pbs.twimg.com',
      'picsum.photos',
      'tripeditor.com',
      'jmhgpckizhiuanhtwncs.supabase.co',
      'lh3.googleusercontent.com',
      'profile.line-scdn.net',
      'pub-3630caf7d6064034a6231d0f6517056e.r2.dev',
      'sta-media.yama-ikitai.com',
    ],
  },
  output: 'standalone',
  experimental: {
    scrollRestoration: true,
  },
  // webpackDevMiddleware: (config) => {next認識していない
  //   // 監視から除外するパスを設定
  //   config.watchOptions.ignored = [
  //     '.next/',
  //     // その他のパス...
  //   ];
  //   return config;
  // },
};
