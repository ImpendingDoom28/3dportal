import React from "react";

import { Button as SemanticButton, ButtonProps } from "semantic-ui-react";

import classNames from "classnames";

import css from "./Button.module.sass";

const Button: React.FC<ButtonProps> = (props) => {

	const classnames = classNames({
		[css.button]: true,
		[props.className as string]: !!props.className 
	})

	return (
		<SemanticButton {...props} className={classnames} animated >
			{props.children}
		</SemanticButton>
	);
}

export default Button;