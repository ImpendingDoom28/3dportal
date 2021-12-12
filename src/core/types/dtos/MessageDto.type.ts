export enum MessageType {
	ERROR = "Error",
	SUCCESS = "Success",
}

export type MessageDto = {
	type: MessageType;
	message: string;
}