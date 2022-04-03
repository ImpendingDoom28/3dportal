import { API } from "@modules/API";
import { BaseUrls }  from "@urls/BaseUrls";

export class BaseRepository<T extends BaseUrls> {

	protected urls: T;
	protected api;

	constructor(urlClass: T) {
		this.urls = urlClass;
		this.api = API;
	}
}