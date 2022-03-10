import React from "react";

import { UserTokenResponseModel } from "@core/types";

import css from "./UserBadge.module.sass";

type UserBadgeProps = {
	user: UserTokenResponseModel
}

export const UserBadge: React.FC<UserBadgeProps> = ({ user }) => {

	return (
		<div className={css.emailWrapper}>
			{`${user.email}`}
		</div>
	);
}