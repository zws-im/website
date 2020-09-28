import React, {ButtonHTMLAttributes, FC, FormHTMLAttributes, InputHTMLAttributes} from 'react';
import styles from './Input.module.scss';

export interface Props extends FormHTMLAttributes<HTMLFormElement> {
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const TextInput: FC<Props> = ({buttonProps, inputProps, ...props}) => {
	return (
		<form className={styles.form} {...props}>
			<input className={styles.input} {...inputProps} />
			<button className={styles.button} type='submit' {...buttonProps}>
				Submit
			</button>
		</form>
	);
};
