import React, {FC, HTMLAttributes, ReactChild} from 'react';
import styles from './Nav.module.scss';

export interface Item {
	key: string;
	to: ReactChild;
}

export interface Props extends HTMLAttributes<HTMLUListElement> {
	children: Item[];
}

export const Nav: FC<Props> = ({children, ...props}) => {
	return (
		<nav>
			<ul className={styles.nav} {...props}>
				{children.map(item => (
					<li key={item.key} className={styles.item}>
						{item.to}
					</li>
				))}
			</ul>
		</nav>
	);
};
