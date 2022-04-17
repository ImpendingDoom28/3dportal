import React, { useEffect } from "react"

// Components
import { QueryClientProvider, QueryClient } from "react-query";
import Head from "next/head";
import Header from "@components/AppHeader";

// Utils
import App from "next/app";
import { authRoutes, navRoutes } from "@constants/routes";
import { useAuthStore } from "src/stores";

// Types
import type { AppContext, AppProps } from "next/app"

// Assets
import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css"
import "../styles/utitilityClasses.sass";

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps, router }: AppProps) => {

	const currentRoute = [...navRoutes, ...authRoutes].find((route) => {
		return route.href === router.pathname;
	});
	const pageTitle = currentRoute ? `3Dportal | ${currentRoute.title}` : "3Dportal";

	const {
		initUserInfo,
	} = useAuthStore((state) => ({
		initUserInfo: state.initStore,
	}));

	useEffect(() => {
		initUserInfo();
	}, [initUserInfo]);

	return (
		<QueryClientProvider client={queryClient}>
			<Head>
        		<title>{pageTitle}</title>
        		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" href="/favicon.ico" />
      		</Head>
			<Header />
			<div className="page-content">
				<Component {...pageProps} />
			</div>
		</QueryClientProvider>
	);
}

// This disables the ability to perform automatic static optimization, 
// causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(appContext);

	return { ...appProps }
}

export default MyApp
