import { AuthUrls } from "../urls/AuthUrls";
import { BaseRepository } from "./BaseRepository";

import { RegisterForm } from "../../types/forms/RegisterForm.type";
import { Message } from "../../types/message.type";

export class AuthRepository extends BaseRepository<AuthUrls> {
	
	constructor() {
		super(new AuthUrls());
	}

	public login() {
		return this.urls.loginUrl
	}

	register(data: RegisterForm) {
		return this.api.post<Message>(this.urls.registerUrl, data)
			.then((response) => response.data)
	}
}