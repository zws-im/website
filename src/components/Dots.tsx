import {FC} from 'react';
import styles from './Dots.module.scss';

export interface Props {
	width: number;
	height: number;
}

const patternId = 'svg-dots';

const color = '#7E4FFF';

export const Dots: FC<Props> = props => (
	<svg viewBox='0 0 540 2340' xmlns='http://www.w3.org/2000/svg' className={styles.dots}>
		<defs>
			<pattern id={patternId} viewBox='0,0,120,120' width={1 / 6} height={1 / 24}>
				<circle r={20} cx={50} cy={50} opacity={0.2} />
			</pattern>
		</defs>

		<rect width={540} height={2340} fill={`url(#${patternId})`} />
		<rect width={540} x={-500} height={1170} fill={`url(#${patternId})`} />
	</svg>
);
