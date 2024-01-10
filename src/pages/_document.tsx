/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
// next
import Document, {Html, Head, Main, NextScript, DocumentProps, DocumentContext} from 'next/document';
import {AppType} from 'next/app';

// theme
import palette from 'src/theme/palette';
import {primaryFont} from 'src/theme/typography';
//
import {MyAppProps} from './_app';

// ----------------------------------------------------------------------

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
  </>
);

const Meta = () => (
  <>
    {/* PWA primary color */}
    <meta name="theme-color" content={palette('light').primary.main} />
    <meta name="description" content="ヤマイキタイ！" />
    <meta name="keywords" content="イキタイ,山イキタイ,ヤマイキタイ,壁登り,写真,山の写真" />
    <meta name="author" content="Yama Ikitai" />
  </>
);

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({emotionStyleTags}: MyDocumentProps) {
  return (
    <Html lang="ja" className={primaryFont.className}>
      <Head>
        <Favicon />
        <Meta />
        {/* Emotion */}
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
        function EnhanceApp(props) {
          return <App {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
  };
};
