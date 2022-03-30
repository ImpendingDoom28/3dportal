import { ProfileUrls } from "../urls/ProfileUrls";
import { BaseRepository } from "./BaseRepository";

export class ProfileRepository extends BaseRepository<ProfileUrls> {

	constructor () {
		super(new ProfileUrls());
	}

	public getProfileById(id: string) {
		return this.api.get(this.urls.profileByIdUrl(id))
			.then((response) => response.data);
	}
}