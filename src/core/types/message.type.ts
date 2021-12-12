export enum MessageType {
	ERROR = "Error",
	SUCCESS = "Success",
}

export type Message = {
	type: MessageType;
	message: string;
}