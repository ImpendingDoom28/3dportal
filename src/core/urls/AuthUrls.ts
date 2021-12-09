import { BaseUrls } from "./BaseUrls";

export class AuthUrls extends BaseUrls {

	constructor() {
		super();
	}

	public get loginUrl() {
		return `${this.authUrl}/login`
	}

	public get registerUrl() {
		return `${this.authUrl}/register`
	}
}