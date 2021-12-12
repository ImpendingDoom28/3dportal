import { AuthUrls } from "@urls/AuthUrls";
import { BaseRepository } from "./BaseRepository";

import { Message, LoginForm, RegisterForm } from "@core/types";

export class AuthRepository extends BaseRepository<AuthUrls> {
	
	constructor() {
		super(new AuthUrls());
	}

	public login(data: LoginForm) {
		return this.api.post<Message>(this.urls.loginUrl, data)
			.then((response) => response.data)
	}

	register(data: RegisterForm) {
		return this.api.post<Message>(this.urls.registerUrl, data)
			.then((response) => response.data)
	}
}