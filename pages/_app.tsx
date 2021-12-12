import React from "react"

// Components
import { QueryClientProvider, QueryClient } from "react-query";
import Head from "next/head";
import Header from "@components/Header";

// Utils
import { authRoutes, routes } from "@constants/routes";

// Types
import type { AppProps } from "next/app"

// Assets
import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps, router }: AppProps) => {

	const currentRoute = [...routes, ...authRoutes].find((route) => {
		return route.href === router.pathname;
	});
	const pageTitle = currentRoute ? `3Dportal | ${currentRoute.title}` : "3Dportal";

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
	)
}

export default MyApp
