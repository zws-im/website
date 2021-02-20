import { makeStyles, Typography, TypographyProps } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import randomizedTextStyles from './RandomizedText.module.scss';

function generateRandomText(length: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11): string {
	return Math.random()
		.toString(26 + 10)
		.slice(2, length + 2);
}

const initialRandomText = 'xyga7z';

export interface Props extends TypographyProps {}

const useStyles = makeStyles({
	text: {
		fontFamily: 'monospace'
	}
});

/**
 * Generates 6 digits of random text each time it's clicked.
 */
export const RandomizedText: FC<Props> = props => {
	const classes = useStyles();
	const [randomizedText, setRandomizedText] = useState(initialRandomText);

	return (
		<Typography
			component='span'
			className={clsx(classes.text, randomizedTextStyles['clickable-text'])}
			onClick={() => setRandomizedText(generateRandomText(6))}
			{...props}
		>
			{randomizedText}
		</Typography>
	);
};
