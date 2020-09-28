import clsx from 'clsx';
import React, {FC, useState} from 'react';
import randomizedTextStyles from './RandomizedText.module.scss';
import {Props as TextProps, Text} from './Text';
import textStyles from './Text.module.scss';

function generateRandomText() {
	return Math.random()
		.toString(26 + 10)
		.slice(2, 8);
}

const initialRandomText = 'xyga7z';

export interface Props extends TextProps {}

/**
 * Generates 6 digits of random text each time it's clicked.
 */
export const RandomizedText: FC<Props> = props => {
	const [randomizedText, setRandomizedText] = useState(initialRandomText);

	return (
		<Text as='span' className={clsx(textStyles.text, randomizedTextStyles.clickableText)} onClick={() => setRandomizedText(generateRandomText())} {...props}>
			{randomizedText}
		</Text>
	);
};
