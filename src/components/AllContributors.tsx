import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, {FC, HTMLAttributes} from 'react';
import styles from './AllContributors.module.scss';
import contributorStyles from './Contributor.module.scss';

type ChildContributor = FC<HTMLAttributes<HTMLElement>>;

export interface Props extends HTMLAttributes<HTMLElement> {
	children: [ChildContributor, ChildContributor];
}

export const AllContributors: FC<Props> = ({className, children: [A, B], ...props}) => (
	<aside className={clsx(className, styles['all-contributors'])} {...props}>
		<A className={clsx(styles.a)} />
		<B className={clsx(styles.b)} />

		<a className={clsx(styles.anchor, styles.github, contributorStyles.image)} href='https://opencollective.com/zws#section-contributors'>
			<div className={styles.child}>
				<FontAwesomeIcon className={styles['child-item']} icon={faGithub} size='8x' />
				<p className={styles['child-item']}>and other contributors</p>
			</div>
		</a>
	</aside>
);
