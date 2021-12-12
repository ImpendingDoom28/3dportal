import React from "react";

// Components
import { Icon, Message as SemanticMessage } from "semantic-ui-react";

// Types
import { AxiosError } from "axios";
import { Message } from "@core/types";

type InformerProps = {
	error?: AxiosError<Message> | null
	hidden?: boolean
}

const Informer: React.FC<InformerProps> = ({ error, hidden }) => {

	if (!error) return null;

	const { 
		response
	} = error;

	if (!response) return null;
	
	const {
		data
	} = response;

	return (
		<SemanticMessage 
			attached={"top"}
			error={!!error}
			hidden={hidden}
			icon
		>
			{!!error && <Icon corner name="warning" /> }
			<SemanticMessage.Content>
				<SemanticMessage.Header>{data.type}</SemanticMessage.Header>
				{data.message}
			</SemanticMessage.Content>
		</SemanticMessage>
	);
}

export default Informer;