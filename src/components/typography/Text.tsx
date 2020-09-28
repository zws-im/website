import clsx from 'clsx';
import {createElement, FC, HTMLAttributes} from 'react';
import {SetOptional} from 'type-fest';
import styles from './Text.module.scss';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
	as: 'p';
}

interface SmallProps extends HTMLAttributes<HTMLElement> {
	as: 'small';
}

interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
	as: 'span';
}

export type Props = SetOptional<HeadingProps | ParagraphProps | SmallProps | SpanProps>;

export const Text: FC<Props> = ({className: previousClassName, as: variant = 'p', ...props}) => {
	let className: string;

	switch (variant) {
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6':
			className = styles.heading;
			break;
		case 'small':
			className = styles.small;
			break;
		default:
			className = styles.text;
			break;
	}

	return createElement(variant, {
		className: clsx(previousClassName, className),
		...props
	});
};
