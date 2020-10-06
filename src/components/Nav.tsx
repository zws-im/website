import Link from 'next/link';
import React, {FC, HTMLAttributes, ReactChild} from 'react';
import styles from './Nav.module.scss';
import {Anchor} from './typography/Anchor';

export type Item = ReactChild;

export interface Props extends HTMLAttributes<HTMLDivElement> {
	children: Item[];
}

export const Nav: FC<Props> = props => {
	return (
		<nav className={styles.nav}>
			<Link passHref href='/'>
				<Anchor>
					<img className={styles.logo} src='/images/logo.png' />
				</Anchor>
			</Link>
			<div className={styles.links} {...props} />
		</nav>
	);
};
