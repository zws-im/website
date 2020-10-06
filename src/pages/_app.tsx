import React from 'react';
import {AppProps} from 'next/app';
// eslint-disable-next-line import/no-unassigned-import
import '../styles/globals.scss';

const MyApp = ({Component, pageProps}: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
