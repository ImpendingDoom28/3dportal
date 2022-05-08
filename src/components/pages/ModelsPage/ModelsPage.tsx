import React from "react";
import { PageContainer, ModelList } from "@components/uiKit";
import { useGetModels } from "@core/services";

export const ModelsPage = () => {
	const {
		data: models,
		isLoading
	} = useGetModels();

	return (
		<PageContainer>
			<ModelList 
				models={models?.content} 
				isLoading={isLoading} 
				header={"Последние загруженные модели"} 
				isCurrentUserProfile={false} 
				actions={undefined}
			/>
		</PageContainer>
	);
}