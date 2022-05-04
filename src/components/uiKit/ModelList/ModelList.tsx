import React, { useMemo } from "react";

import { Grid, Header, Loader } from "semantic-ui-react";
import { ModelCard } from "@uiKit/index";

import { ModelFileDto } from "@core/types";

import css from "./ModelList.module.sass";

type ModelListProps = {
	models: ModelFileDto[] | undefined;
	isLoading: boolean;
	header: string;
	amountOfItemsPerRowInGrid?: number;
	isCurrentUserProfile: boolean;
	actions: React.ReactNode
	sortBy?: "date"
}

export const ModelList: React.FC<ModelListProps> = (
	{ 
		models,
		header,
		isLoading,
		actions,
		isCurrentUserProfile,
		sortBy = "date",
		amountOfItemsPerRowInGrid = 3
	}) => {

	const rowsCount = models && Math.ceil(models?.length / amountOfItemsPerRowInGrid);
	const helperArray = new Array(rowsCount).fill(undefined);

	const getSortFunction = (sortBy: ModelListProps["sortBy"]) => {
		if(sortBy === "date") {
			return (a: ModelFileDto, b: ModelFileDto) => {
				return b.uploadDate - a.uploadDate
			}
		}
		return undefined;
	}
	const sortFunction = useMemo(() => {
		return getSortFunction(sortBy)
	}, [sortBy]);

	return (
		<div className={css.modelList}>
			<div className={css.header}>
				<Header size="huge">
					{header}
				</Header>
				<div className={css.actions}>
					{actions}
				</div>
			</div>
			{
				isLoading ? (
					<Loader active />
				) : (
					<Grid columns="equal" container>
						{
							helperArray.length > 0 ? 
								helperArray.map((_, rowIndex) => {
									// 0 = 0 * 3 <-> 0 * 3 + 3 = 0, 1, 2
									// 1 = 1 * 3 <-> 1 * 3 + 2 = 4, 5
									const newModelList = models?.sort(sortFunction)?.slice(rowIndex * 3, rowIndex * 3 + 3);
						
									return (
										<Grid.Row key={`row-${rowIndex}`}>
											{newModelList?.map((model) => {
												return (
													<Grid.Column key={`column-${model.generatedName}`}>
														<ModelCard 
															model={model}
															display={newModelList.length === 1 ? "vertical" : "horizontal"}
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
	)
}