import React from "react";

import Link from "next/link";
import { Logo, RouteLink } from "@uiKit/index";

import { authRoutes, routes } from "@constants/routes";

import css from "./Header.module.sass";

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
					<nav className={css.navigation}>
						{authRoutes.map((route, index) => {
							return <RouteLink route={route} key={route.href} accented={index == 0}/>
						})}
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;