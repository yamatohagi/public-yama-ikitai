module.exports = {
  apps: [
    {
      name: 'climb-bond', // アプリケーションの名前
      script: 'npm', // 実行するスクリプト
      args: 'run start', // スクリプトの引数
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: '3G',
      env: {
        NODE_OPTIONS: '--max-old-space-size=4096',
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        HOST: process.env.HOST,
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
        PORT: process.env.PORT,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        LINE_CLIENT_ID: process.env.LINE_CLIENT_ID,
        LINE_CLIENT_SECRET: process.env.LINE_CLIENT_SECRET,
        TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        EMAIL_FROM: process.env.EMAIL_FROM,
        NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID,
        NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY,
        NEXT_PUBLIC_CLOUDFLARE_ENDPOINT: process.env.NEXT_PUBLIC_CLOUDFLARE_ENDPOINT,
        NEXT_PUBLIC_IMAGE_HOST_URL: process.env.NEXT_PUBLIC_IMAGE_HOST_URL,
        NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
    },
  ],
  deploy: {
    production: {
      user: 'yamatohagi', // サーバーのユーザー名
      host: '35.233.149.73', // サーバーのホスト
      key: '~/.ssh/deploy.key', // SSHキーのパス
      ref: 'origin/main', // デプロイするブランチ
      repo: 'https://github.com/yamatohagi/climb-bond', // リポジトリのURL
      path: '/home/yamatohagi/climb-bond', // アプリケーションのデプロイ先のパス
      'post-deploy': 'pwd && ls && git log -n 1 && npm install && npm run build && pm2 restart climb-bond && pm2 save',

      env: {
        NODE_OPTIONS: '--max-old-space-size=4096',
        NEXT_PUBLIC_VERCEL_ENV: 'production',
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        HOST: process.env.HOST,
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
        PORT: process.env.PORT,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        LINE_CLIENT_ID: process.env.LINE_CLIENT_ID,
        LINE_CLIENT_SECRET: process.env.LINE_CLIENT_SECRET,
        TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        EMAIL_FROM: process.env.EMAIL_FROM,
        NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID,
        NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY,
        NEXT_PUBLIC_CLOUDFLARE_ENDPOINT: process.env.NEXT_PUBLIC_CLOUDFLARE_ENDPOINT,
        NEXT_PUBLIC_IMAGE_HOST_URL: process.env.NEXT_PUBLIC_IMAGE_HOST_URL,
        NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
    },
  },
};
