import { AuthUrls } from "@urls/AuthUrls";
import { BaseRepository } from "./BaseRepository";

import { 
	MessageDto, 
	LoginDto, 
	LoginForm, 
	RegisterForm, 
} from "@core/types";

export class AuthRepository extends BaseRepository<AuthUrls> {
	
	constructor() {
		super(new AuthUrls());
	}

	public login(data: LoginForm) {
		return this.api.post<LoginDto>(this.urls.loginUrl, data)
			.then((response) => response.data)
	}

	public register(data: RegisterForm) {
		return this.api.post<MessageDto>(this.urls.registerUrl, data)
			.then((response) => response.data)
	}
}