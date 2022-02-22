import React from "react";

import { useRouter } from "next/dist/client/router";

import { NextPage } from "next";
import { useAuthStore } from "../../src/stores";

const ProfilePageById: NextPage = () => {
	const router = useRouter();
  	const { id } = router.query;

	const currentUser = useAuthStore((state) => state.currentUser);

	return (
		<div>
			{currentUser?.id === id ? "this is my profile" : `selected profile: ${id}`}
		</div>
	)
};

export default ProfilePageById;