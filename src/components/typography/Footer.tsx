import clsx from 'clsx';
import {FC, HTMLAttributes} from 'react';
import styles from './Footer.module.scss';

export interface Props extends HTMLAttributes<HTMLElement> {}

export const Footer: FC<Props> = ({className, ...props}) => <footer className={clsx(styles.footer, className)} {...props} />;
