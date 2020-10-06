import Link from 'next/link';
import React, {FC, HTMLAttributes, ReactChild} from 'react';
import styles from './Nav.module.scss';
import {Anchor} from './typography/Anchor';

export interface Item {
	key: string;
	to: ReactChild;
}

export interface Props extends HTMLAttributes<HTMLUListElement> {
	children: Item[];
}

export const Nav: FC<Props> = ({children, ...props}) => {
	return (
		<nav className={styles.nav}>
			<Link passHref href='/'>
				<Anchor>
					<img className={styles.logo} src='/images/logo.png' />
				</Anchor>
			</Link>
			<div className={styles.links} {...props}>
				{children.map(item => item.to)}
			</div>
		</nav>
	);
};
