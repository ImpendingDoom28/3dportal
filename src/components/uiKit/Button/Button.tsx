import React from "react";

import { 
	Button as SemanticButton, 
	ButtonProps as SemanticButtonProps 
} from "semantic-ui-react";

import classNames from "classnames";

import css from "./Button.module.sass";

type ButtonProps = SemanticButtonProps & {
	accented?: boolean
}

export const Button: React.FC<ButtonProps> = (
	{
		accented,
		primary,
		className, 
		children, 
		...rest
	}) => {

	const classnames = classNames({
		[css.button]: true,
		[css.primary]: primary,
		["accented"]: accented,
		[className as string]: !!className 
	});

	return (
		<SemanticButton 
			{...rest}
			accented={null}
			className={classnames} 
			animated={false}
		>
			{children}
		</SemanticButton>
	);
}