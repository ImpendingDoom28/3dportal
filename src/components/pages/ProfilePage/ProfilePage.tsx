import React from "react";

import { Divider, Header, Loader, Segment } from "semantic-ui-react";
import { AddModelForm } from "@components/forms";
import { PageContainer } from "@uiKit/index";

import { useRouter } from "next/dist/client/router";
import { useAuthStore } from "@stores/authStore";
import { useProfileById } from "@services/ProfileService";


import css from "./ProfilePage.module.sass";

export const ProfilePage = () => {
	const router = useRouter();
	const { id } = router.query; 

	const currentUser = useAuthStore((state) => state.currentUser);
	const {
		data,
		isLoading,
	} = useProfileById(id as string | undefined);

	if(!data) { 
		return (
			<PageContainer>
				<Header>
					{"Oops, no user with that ID is found :("}
				</Header>
			</PageContainer>
		)
	}

	if(isLoading) return <Loader />

	const isCurrentUserProfile = currentUser?.id === id;
	const firstWord = isCurrentUserProfile ? "Your" :  `${data.email}'s`;

	return (
		<div className={css.profileContainer}>
			<div className={css.infoContainer}> 
				<Segment className={css.userInfoContainer}>
					<Header>
						{`${firstWord} profile`}
					</Header>
				</Segment> 
				<Segment className={css.addModelForm}>
					{isCurrentUserProfile ? <AddModelForm /> : ":)"}
				</Segment>
			</div>
			<Divider />
			<div className={css.modelList}>
				{`${firstWord} models list`}
			</div>
		</div>
	)
}