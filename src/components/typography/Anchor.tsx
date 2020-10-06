import clsx from 'clsx';
import React, {AnchorHTMLAttributes, FC} from 'react';
import styles from './Anchor.module.scss';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Anchor: FC<Props> = ({className, ...props}) => {
	return <a className={clsx(className, styles.link)} {...props} />;
};
