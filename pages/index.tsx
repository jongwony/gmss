import Head from "next/head";
import Script from "next/script";
import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Feature from "components/category";
import { darkTheme } from "styles/theme";

export default function Home({ }) {
  return (
    <div>
      <Head>
        <title>MBTI 그룹 궁합 - 우리 팀의 MBTI 궁합은?</title>
        <meta name="description" content="단체 회식 자리 나눌 때 조별 과제 할 때 우리 팀의 MBTI 시너지는?" />
        <meta property="og:title" content="MBTI 그룹 궁합" key="ogtitle" />
        <meta property="og:description" content="단체 회식 자리 나눌 때 조별 과제 할 때 우리 팀의 MBTI 시너지는?" key="ogdescription" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4530873656649886" crossOrigin="anonymous"></Script>
      <Script id="google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html:
          `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WJ4PFGX')`
      }}></Script>
      <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJ4PFGX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Feature />
      </ThemeProvider>
    </div>
  );
}
