import Head from "next/head";
import Script from "next/script";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "styles/theme";
import { Stack } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type LayoutProps = {
    children: React.ReactNode
}

interface Option {
    label: string;
    value: string;
    href: string;
}

export default function Layout({ children }: LayoutProps) {
    const options: Option[] = [
        { label: '우리 팀 궁합 점수', value: '0', href: '/' },
        { label: '그룹 나누기', value: '1', href: '/grouper' },
        { label: '친구 찾기', value: '2', href: '/recommend' },
    ];
    const [state, setState] = useState('0');
    const router = useRouter();
    const handleButtonClick = (value: string | null) => {
        const selectedOption = options.find(option => option.value === value);
        if (selectedOption) {
            router.push(selectedOption.href);
            setState(value);
        }
    };

    return (
        <>
            <Head>
                <title>MBTI 그룹 궁합 - 우리 팀의 MBTI 궁합은?</title>
                <meta name="description" content="단체 회식 자리 나눌 때 조별 과제 할 때 우리 팀의 MBTI 시너지는?" />
                <meta property="og:title" content="MBTI 그룹 궁합" key="ogtitle" />
                <meta name="keywords" content="MBTI, 그룹, 궁합, 단체회식, 조별과제, 팀나누기, 유형테스트, 성격테스트" />
                <meta property="og:description" content="단체 회식 자리 나눌 때 조별 과제 할 때 우리 팀의 MBTI 시너지는?" key="ogdescription" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4530873656649886" crossOrigin="anonymous"></Script>
            <Script id="google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{
                __html:
                    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WJ4PFGX')`
            }}></Script>
            <noscript dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJ4PFGX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Stack sx={{ display: 'grid', flexGrow: 1, m: 2 }}>
                    <ToggleButtonGroup
                        color="primary"
                        value={state}
                        exclusive
                        onChange={(event, value) => handleButtonClick(value)}
                        aria-label="Category"
                    >
                        {options.map(option => (
                            <ToggleButton key={option.value} value={option.value}>
                                <Link href={option.href}>
                                    <span>
                                        {option.label}
                                    </span>
                                </Link>
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <main>
                        {children}
                    </main>
                </Stack>
            </ThemeProvider>
        </>
    )
}