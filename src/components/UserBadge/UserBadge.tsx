import React from "react";

import { RouteLink } from "../uiKit";

import { userRoutes } from "../../constants";

import { UserTokenResponseModel } from "@core/types";

import css from "./UserBadge.module.sass";

type UserBadgeProps = {
	user: UserTokenResponseModel
}

export const UserBadge: React.FC<UserBadgeProps> = ({ user }) => {

	return (
		<RouteLink 
			className={css.emailWrapper} 
			route={
				{
					href: `${userRoutes[0].href}/${user.id}`,
					title: user.email
				}
			}
		/>
	);
}