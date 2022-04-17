
import React from "react";

import { Card, Icon } from "semantic-ui-react";
import { ModelViewer } from "../ModelViewer";
import { UserBadge } from "../../UserBadge";
import { RouteLink } from "../RouteLink";

import { getFormattedDateFromMs } from "../../../core/modules/DateModule";
import { ModelFileDto } from "../../../core/types";
import { navRoutes } from "../../../constants";

import css from "./ModelCard.module.sass";

type ModelCardProps = {
	model: ModelFileDto
	isCurrentUserProfile?: boolean
}

export const ModelCard: React.FC<ModelCardProps> = (
	{
		model,
		isCurrentUserProfile
	}) => {

	return (
		<Card fluid>
			<ModelViewer model={model}/>
			<Card.Content>
				<Card.Header>
					<RouteLink
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
						<Icon 
							name={"trash"}
							color={"red"}
						/>
					</div> 
				}
			</Card.Content>
		</Card>
	)
};