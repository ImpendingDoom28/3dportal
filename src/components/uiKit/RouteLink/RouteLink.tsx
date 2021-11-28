import React from 'react';

// Components
import Link from 'next/link';

// Utils
import classnames from 'classnames';
import { Route } from '../../../types/route.type';

// Assets
import css from './RouteLink.module.sass';


type RouteLinkProps = {
	route: Route,
	passHref?: true,
	className?: string
}

const RouteLink: React.FC<RouteLinkProps> = ({ children, className, route }) => {

	const { href, title } = route;

	const linkClassName = classnames({
		[css.link]: true,
		[className as string]: !!className
	})

	return (
		<Link href={href} passHref>
			<span className={linkClassName}>{title}</span>
		</Link>
	);
}

export default RouteLink;