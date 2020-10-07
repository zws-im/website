import clsx from 'clsx';
import React, {AnchorHTMLAttributes, FC, MutableRefObject} from 'react';
import styles from './Anchor.module.scss';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	variant?: 'nav' | 'link';
}

export const Anchor: FC<Props> = React.forwardRef(({className, variant = 'link', ...props}, ref: MutableRefObject<HTMLAnchorElement>) => (
	<a ref={ref} className={clsx(styles.base, {[styles.link]: variant === 'link', [styles.nav]: variant === 'nav'}, className)} {...props} />
));
