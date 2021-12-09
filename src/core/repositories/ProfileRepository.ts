import { BaseRepository } from "./BaseRepository";

export class ProfileRepository extends BaseRepository {

	constructor() {
		super();
	}

	getProfileById(id: number) {
		return this.api.get(`${this.baseUrls.profileUrl}${id}`, {})
	}
}