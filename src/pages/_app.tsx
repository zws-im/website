import {
	AppBar,
	Box,
	Container,
	createMuiTheme,
	createStyles,
	CssBaseline,
	makeStyles,
	ThemeProvider,
	Toolbar,
	Typography,
	Link as Anchor
} from '@material-ui/core';
import {AppProps} from 'next/app';
import Link from 'next/link';
import React from 'react';
import {Dots} from '../components/Dots';
import {Gradients} from '../components/Gradients';
import {Logo} from '../components/Logo';
import {NavItems} from '../nav';
import {Home as SectionIds} from '../sectionIds';
// eslint-disable-next-line import/no-unassigned-import
import '../styles/globals.scss';
import styles from './_app.module.scss';

const theme = createMuiTheme({
	palette: {type: 'dark', primary: {main: '#9775f2'}, secondary: {main: '#7e4fff'}},
	typography: {
		fontFamily: "'Liberation Sans', sans-serif",
		h1: {fontSize: '42px', fontWeight: 'bold', textAlign: 'center'},
		h2: {fontSize: '28px', fontWeight: 'bold'},
		h3: {fontSize: '18px', fontWeight: 'bold'},
		h4: {fontSize: '15px', fontWeight: 'bold'},
		body1: {fontSize: '17px'},
		body2: {fontSize: '18px'}
	}
});

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			flexGrow: 1,
			marginBottom: theme.spacing(32)
		},
		logo: {
			// marginRight: theme.spacing(2),
			flexGrow: 1
		}
	})
);

const MyApp = ({Component, pageProps}: AppProps) => {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	const classes = useStyles();

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<div className={classes.root}>
					<AppBar position='static' color='transparent' elevation={0}>
						<Toolbar>
							<Link href='/'>
								<a className={classes.logo}>
									<div>
										<Logo />
									</div>
								</a>
							</Link>
							<NavItems />
						</Toolbar>
					</AppBar>
				</div>

				<div className={styles.dots}>
					<Dots width={6} height={24} />
				</div>

				<Container>
					<Component {...pageProps} />

					<Box component='footer' id={SectionIds.Footer} marginY={4}>
						<Typography>
							ZWS and zws.im are licensed under the <Anchor href='https://www.apache.org/licenses/LICENSE-2.0'>Apache 2.0 license</Anchor>
						</Typography>
					</Box>
				</Container>

				<Gradients />
			</ThemeProvider>
		</>
	);
};

export default MyApp;
