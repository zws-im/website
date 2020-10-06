import clsx from 'clsx';
import React, {AnchorHTMLAttributes, FC, MutableRefObject} from 'react';
import styles from './Anchor.module.scss';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Anchor: FC<Props> = React.forwardRef(({className, ...props}, ref: MutableRefObject<HTMLAnchorElement>) => (
	<a ref={ref} className={clsx(className, styles.link)} {...props} />
));
