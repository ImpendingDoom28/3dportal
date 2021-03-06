import React from "react";

import Link from "next/link";
import { Logo } from "../Logo";
import { LogoutModalWithButton, RouteLink } from "@uiKit/index";
import { UserBadge } from "../UserBadge";

import { authRoutes, navRoutes } from "@constants/routes";
import { useAuthStore } from "@stores/authStore";

import css from "./AppHeader.module.sass";

const AppHeader = () => {

	const currentUser = useAuthStore(state => state.currentUser);

	return (
		<header className={css.headerWrapper}>
			<div className={css.header}>
				<Link href={"/models"} passHref>
					<Logo />
				</Link>
				<div className={css.links}>
					<nav className={css.navigation}>
						{navRoutes.map((route) => {
							return <RouteLink route={route} key={route.href}/>
						})}
					</nav>
					<nav className={css.navigation}>
						{
							currentUser ? (
								<>
									<UserBadge user={currentUser} /> 
									<LogoutModalWithButton />
								</>
							) : (
								<>
									{authRoutes.map((route, index) => {
										return <RouteLink route={route} key={route.href} accented={index === 0}/>
									})}
								</>
							)
						}
					</nav>
				</div>
			</div>
		</header>
	);
}

export default AppHeader;