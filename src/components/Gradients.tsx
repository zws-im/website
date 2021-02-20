import styles from './Gradients.module.scss';
import {FC} from 'react';

export const Gradients: FC = () => (
	<>
		<div className={styles.wavy} />
		<div className={styles.radial} />
		<div className={styles.bottom} />
	</>
);
