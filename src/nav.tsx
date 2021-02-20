import {Button, makeStyles, Typography, withStyles} from '@material-ui/core';
import Link from 'next/link';
// import {Anchor} from './components/typography/Anchor';
import React, {FC, ReactChild} from 'react';
import {Home as HomeSectionIds} from './sectionIds';

const NavButton = withStyles({
	root: {
		boxShadow: 'none',
		textTransform: 'none'
		// paddingLeft: '35px',
		// paddingRight: '35px'
	}
})(Button);

const useStyles = makeStyles(theme => ({
	button: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	}
}));

export const NavItems: FC = () => {
	const classes = useStyles();

	return (
		<>
			<Link key='questions' passHref href={`/#${HomeSectionIds.Faq}`}>
				<NavButton disableRipple className={classes.button}>
					<Typography variant='h4' component='span'>
						Questions
					</Typography>
				</NavButton>
			</Link>

			<Link key='docs' passHref href='/'>
				<NavButton disableRipple className={classes.button}>
					<Typography variant='h4' component='span'>
						Docs
					</Typography>
				</NavButton>
			</Link>

			<NavButton disableRipple className={classes.button} key='github' href='https://github.com/zws-im?utm_source=zws.im'>
				<Typography variant='h4' component='span'>
					GitHub
				</Typography>
			</NavButton>
		</>
	);
};
