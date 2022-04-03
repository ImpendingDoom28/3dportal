import { BaseUrls } from "./BaseUrls";

export class ModelsUrls extends BaseUrls {
	constructor () {
		super();
	}

	public get models() {
		return this.modelsUrl;
	}
}