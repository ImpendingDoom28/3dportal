
import React, { useState } from "react";

import { Card, Icon } from "semantic-ui-react";
import { UserBadge } from "@components/UserBadge";
import { RouteLink, ModelViewer } from "@uiKit/index";

import { getFormattedDateFromMs } from "@core/modules";
import { ModelFileDto } from "@core/types";
import { navRoutes } from "@constants/index";

import css from "./ModelCard.module.sass";

type ModelCardProps = {
	model: ModelFileDto;
	display: "vertical" | "horizontal"
	isCurrentUserProfile?: boolean
}

export const ModelCard: React.FC<ModelCardProps> = (
	{
		model,
		isCurrentUserProfile
	}) => {

	const [hovered, setHovered] = useState<boolean>(false);

	const onMouseOver = () => {
		setHovered(true);
	};
	const onMouseLeave = () => {
		setHovered(false);
	}

	return (
		<Card
			fluid
			style={{
				boxShadow: hovered ? 
					"0 1px 15px -4px #c5c5c5, 0 0 0 1px #c5c5c5" : 
					"0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5",
			}}
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}
		>
			<ModelViewer model={model}/>
			<Card.Content>
				<Card.Header>
					<RouteLink
						padded={false}
						route={{
							href: navRoutes[0].href + "/" + model.generatedName,
							title: model.givenName
						}}
					/>
				</Card.Header>
				<Card.Meta>
					{`Загружено ${getFormattedDateFromMs(model.uploadDate)}`}
				</Card.Meta>
				<UserBadge
					textBefore={"Автор: "}
					className={css.userBadge}
					user={model.user}
				/>
			</Card.Content>
			<Card.Content extra className={css.cardActions}>
				<div>
					<span className={css.actionText}>
						<Icon 
							name="like"
						/>
						{"0"}
					</span>
					<span className={css.actionText}>
						<Icon 
							name="comment outline"
						/>
						{"0"}
					</span>
				</div>
				{isCurrentUserProfile &&
					<div>
						<span className={css.actionText}>
							<Icon 
								name={"trash"}
								color={"red"}
							/>
						</span>
					</div> 
				}
			</Card.Content>
		</Card>
	)
};