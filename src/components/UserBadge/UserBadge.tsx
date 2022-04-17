import React from "react";

import { RouteLink } from "../uiKit";

import { userRoutes } from "../../constants";
import classnames from "classnames";

import { UserTokenResponseModel } from "@core/types";

import css from "./UserBadge.module.sass";

type UserBadgeProps = {
	user: UserTokenResponseModel,
	textBefore?: string,
	className?: string
}

export const UserBadge: React.FC<UserBadgeProps> = (
	{ 
		user, 
		className,
		textBefore 
	}) => {

	const classNames = classnames({
		[css.emailWrapper]: true,
		[className as string]: !!className
	})

	return (
		<RouteLink 
			className={classNames} 
			padded={false}
			route={
				{
					href: `${userRoutes[0].href}/${user.id}`,
					title: textBefore ? `${textBefore} ${user.email}` : user.email
				}
			}
		/>
	);
}