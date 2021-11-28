import React from 'react'

import type { AppProps } from 'next/app'
import Header from '../src/components/Header/Header';

import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<div>
			<Header />
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
