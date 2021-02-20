import React, { FC, HTMLAttributes } from 'react';
import styles from './Faq.module.scss';
import {Typography} from '@material-ui/core';

export interface Props extends HTMLAttributes<HTMLUListElement> {
	faq: Array<{
		key: string;
		title: string;
		body: string;
	}>;
}

export const Faq: FC<Props> = ({faq, ...props}) => (
	<ul className={styles.faq} {...props}>
		{faq.map(question => (
			<li key={question.key} className={styles.item}>
				<Typography variant='h3'>{question.title}</Typography>

				<Typography>{question.body}</Typography>
			</li>
		))}
	</ul>
);
