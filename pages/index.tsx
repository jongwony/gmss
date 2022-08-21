import Head from "next/head";
import Script from "next/script";
import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Feature from "components/mbti/category";
import { darkTheme } from "styles/theme";

export default function Home({ }) {
  return (
    <div>
      <Head>
        <title>MBTI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></Script>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Feature />
      </ThemeProvider>

      <amp-ad width="100vw" height="320"
        type="adsense"
        data-ad-client="ca-pub-4530873656649886"
        data-ad-slot="2661782502"
        data-auto-format="rspv"
        data-full-width="">
        <div overflow=""></div>
      </amp-ad>
    </div>
  );
}
