import React from 'react'
import { AppProps } from 'next/app'
import Script from "next/script";
import '../styles/index.css'
import Head from 'next/head';
import 'react-tooltip/dist/react-tooltip.css'

function MyApp({ Component, pageProps }: AppProps) {

    return <>
        <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <Script id="google-analytics" strategy="lazyOnload">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
        </Script>
        <Head>
            <link rel="apple-touch-icon" href="/images/apple-57.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-72.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-114.png" />
            <meta name="theme-color" content="#f78e05" />
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp;