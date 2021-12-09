import { AuthUrls } from "../urls/AuthUrls";
import { BaseRepository } from "./BaseRepository";

export class AuthRepository extends BaseRepository<AuthUrls> {
	
	constructor() {
		super(new AuthUrls);
	}

	public login() {
		return this.urls.loginUrl
	}
}