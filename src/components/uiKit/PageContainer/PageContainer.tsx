import React from "react";

import classNames from "classnames";

import css from "./PageContainer.module.sass";

type PageContainerProps = {
	className?: string;
	style?: React.CSSProperties
}

const PageContainer: React.FC<PageContainerProps> = (
	{ 
		children,
		style,
		className 
	}) => {
	
	const classnames = classNames({
		[css.container]: true,
		[className as string]: !!className 
	});

	return (
		<div 
			className={classnames}
			style={style}
		>
			{children}
		</div>
	);
}

export default PageContainer;