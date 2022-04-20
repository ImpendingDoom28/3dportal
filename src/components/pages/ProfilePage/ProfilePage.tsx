import React from "react";

import { Divider, Header, Loader } from "semantic-ui-react";
import { UploadModelForm } from "@components/forms";
import { ModelList, PageContainer } from "@uiKit/index";

import { useRouter } from "next/dist/client/router";
import { useAuthStore } from "@stores/authStore";
import { useGetUserModels, useProfileById } from "@core/services";

import css from "./ProfilePage.module.sass";

export const ProfilePage = () => {
	const router = useRouter();
	const { id } = router.query; 

	const currentUser = useAuthStore((state) => state.currentUser);
	const {
		data: profileData,
		isLoading: isProfileLoading,
	} = useProfileById(id as string | undefined);
	const {
		data: modelsList,
		isLoading: areModelsLoading
	} = useGetUserModels(id as number | undefined);

	if(isProfileLoading) {
		return (
			<Loader active size="big"/>
		)
	}

	if(!profileData) { 
		return (
			<PageContainer>
				<Header>
					{"Уупс, пользователя с таким ID не найдено :("}
				</Header>
			</PageContainer>
		)
	}

	const isCurrentUserProfile = currentUser?.id === id;
	const header = isCurrentUserProfile ? "Ваш список моделей" : `Список моделей ${profileData.email}`
	const actions = isCurrentUserProfile ? <UploadModelForm /> : null;

	return (
		<div className={css.profileContainer}>
			<Divider />
			<ModelList
				actions={actions}
				header={header}
				isCurrentUserProfile={isCurrentUserProfile}
				isLoading={areModelsLoading}
				models={modelsList} 
			/>
		</div>
	)
}