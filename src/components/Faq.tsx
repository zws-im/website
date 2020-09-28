import React, {FC, HTMLAttributes} from 'react';
import styles from './Faq.module.scss';
import {Text} from './typography/Text';

export interface Props extends HTMLAttributes<HTMLUListElement> {
	faq: Array<{
		key: string;
		title: string;
		body: string;
	}>;
}

export const Faq: FC<Props> = ({faq, ...props}) => {
	return (
		<ul className={styles.faq} {...props}>
			{faq.map(question => (
				<li key={question.key} className={styles.item}>
					<Text as='h3'>{question.title}</Text>

					<Text>{question.body}</Text>
				</li>
			))}
		</ul>
	);
};
