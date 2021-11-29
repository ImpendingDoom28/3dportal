import React from 'react'

import type { AppProps } from 'next/app'
import Header from '../src/components/Header/Header';

// Assets
import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Header />
			<div className='page-content'>
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
