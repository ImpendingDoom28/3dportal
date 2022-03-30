import { BaseUrls } from "./BaseUrls";

export class ProfileUrls extends BaseUrls {

	public profileByIdUrl(id?: string) {
		return this.profileUrl.concat(`/${id}`);
	}

}