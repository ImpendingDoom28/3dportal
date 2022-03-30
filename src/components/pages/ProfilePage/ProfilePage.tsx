import React from "react";

import { Header, Loader } from "semantic-ui-react";

import { useRouter } from "next/dist/client/router";
import { useAuthStore } from "@stores/authStore";
import { useProfileById } from "@services/ProfileService";

export const ProfilePage = () => {
	const router = useRouter();
	const { id } = router.query; 

	const currentUser = useAuthStore((state) => state.currentUser);
	const {
		data,
		isLoading,
	} = useProfileById(id as string | undefined);

	if(!data) return null;

	if(isLoading) return <Loader />

	return (
		<div>
			<Header>
				{currentUser?.id === id ? "Your profile" : `${data.email} profile`}
			</Header>
			{JSON.stringify(data, null, 2)}
		</div>
	)
}