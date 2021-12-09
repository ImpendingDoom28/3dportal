import React from 'react';

import Link from 'next/link';
import { Logo } from '../uiKit/Logo';
import { RouteLink } from '../uiKit/RouteLink';

import { routes } from './routes';

import css from './Header.module.sass';

const Header = () => {

	return (
		<header className={css.headerWrapper}>
			<div className={css.header}>
				<Link href={"/models"} passHref>
					<Logo />
				</Link>
				<div className={css.links}>
					<nav className={css.navigation}>
						{routes.map((route) => {
							return <RouteLink route={route} key={route.href}/>
						})}
					</nav>
					{/* TODO: Add profile login and check */}
				</div>
			</div>
		</header>
	);
}

export default Header;