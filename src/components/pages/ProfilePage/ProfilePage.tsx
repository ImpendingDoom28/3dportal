import React from "react";

import { Divider, Grid, Header, Loader } from "semantic-ui-react";
import { UploadModelForm } from "@components/forms";
import { ModelCard, PageContainer } from "@uiKit/index";

import { useRouter } from "next/dist/client/router";
import { useAuthStore } from "@stores/authStore";
import { useProfileById } from "@services/ProfileService";
import { useGetUserModels } from "../../../core/services";

import css from "./ProfilePage.module.sass";

const amountOfItemsPerRowInGrid = 3;

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

	console.log(id);
	
	if(!profileData) { 
		return (
			<PageContainer>
				<Header>
					{"Уупс, пользователя с таким ID не найдено :("}
				</Header>
			</PageContainer>
		)
	}

	if(isProfileLoading) return <Loader active size="big"/>

	const isCurrentUserProfile = currentUser?.id === id;

	const gridRowAdd = modelsList && Math.ceil(modelsList?.length / amountOfItemsPerRowInGrid);
	const helperArray = new Array(gridRowAdd).fill(undefined);

	const sortedByUploadDateModelsList = modelsList?.sort((a, b) => {
		return +b.uploadDate - +a.uploadDate
	});

	return (
		<div className={css.profileContainer}>
			<Divider />
			<div className={css.modelList}>
				<div className={css.header}>
					<Header size="huge">
						{isCurrentUserProfile ? "Ваш список моделей" : `Список моделей ${profileData.email}`}
					</Header>
					<div>
						{isCurrentUserProfile ? <UploadModelForm /> : null}
					</div>	
				</div>
				{
					areModelsLoading ? (
						<Loader active/>
					) : (
						<Grid columns="equal" container>
							{
								helperArray.length > 0 ? 
									helperArray.map((_, rowIndex) => {
									// 0 = 0 * 3 <-> 0 * 3 + 3 = 0, 1, 2
									// 1 = 1 * 3 <-> 1 * 3 + 2 = 4, 5
										const newModelList = sortedByUploadDateModelsList?.slice(rowIndex * 3, rowIndex * 3 + 3);
						
										return (
											<Grid.Row key={`row-${rowIndex}`}>
												{newModelList?.map((model) => {

													return (
														<Grid.Column key={`column-${model.generatedName}`}>
															<ModelCard 
																model={model}
																isCurrentUserProfile={isCurrentUserProfile}
															/>
														</Grid.Column>
													);
												})}
											</Grid.Row>
										)
									}) : 
									<Grid.Row centered>
										{"Пока нет загруженных моделей"}
									</Grid.Row>
							}
						</Grid>
					)
				}
			</div>
		</div>
	)
}