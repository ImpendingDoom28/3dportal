import { API } from '../modules/API';
import { BaseUrls }  from '../urls/BaseUrls';

export class BaseRepository<T extends BaseUrls> {

	public urls: T;
	public api;

	constructor(urlClass: T) {
		this.urls = urlClass;
		this.api = API;
	}
}