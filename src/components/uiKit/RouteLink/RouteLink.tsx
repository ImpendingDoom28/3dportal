import React from "react";

// Components
import Link from "next/link";

// Utils
import classnames from "classnames";
import { Route } from "@core/types";

// Assets
import css from "./RouteLink.module.sass";


type RouteLinkProps = {
	route: Route,
	passHref?: true,
	className?: string
	accented?: boolean
}

const RouteLink: React.FC<RouteLinkProps> = (
	{ 
		children, 
		className, 
		route, 
		accented = false
	}) => {

	const { href, title } = route;

	const linkClassName = classnames({
		[css.link]: true,
		[css.linkBasic]: !accented,
		[css.linkInverted]: accented,
		[className as string]: !!className
	})

	return (
		<Link href={href} passHref>
			<span className={linkClassName}>{title}</span>
		</Link>
	);
}

export default RouteLink;