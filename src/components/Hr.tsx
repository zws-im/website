import React, {FC, HTMLAttributes} from 'react';
import styles from './Hr.module.scss';

export interface Props extends HTMLAttributes<HTMLHRElement> {}

export const Hr: FC<Props> = props => <hr className={styles.divider} {...props} />;
