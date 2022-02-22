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

const Button: React.FC<ButtonProps> = (props) => {

	const classnames = classNames({
		[css.button]: true,
		["accent"]: props.accented,
		[props.className as string]: !!props.className 
	});

	return (
		<SemanticButton 
			{...props} 
			className={classnames} 
			animated={false}
		>
			{props.children}
		</SemanticButton>
	);
}

export default Button;