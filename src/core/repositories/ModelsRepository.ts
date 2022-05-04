import { ModelsUrls } from "@core/urls";
import { BaseRepository } from "./BaseRepository";

export class ModelsRepository extends BaseRepository<ModelsUrls> {

	constructor () {
		super(new ModelsUrls());
	}

	// Should be send as multipart/form-data
	public uploadModel(
		model: File, 
		givenName: string,
		userId: number
	) {
		const formData = new FormData();
		formData.append("model", model, model.name);
		formData.append("lastModified", `${model.lastModified}`)
		formData.append("givenName", givenName);
		formData.append("userId", `${userId}`);
		return this.api.post(
			this.urls.models, 
			formData,
			{
				headers: { "Content-Type": " multipart/form-data" },
			}
		)
			.then((response) => response.data)
			.catch(err => {
				console.error("Error: ", err)
			});
	}

	public getModelsByUserId(userId: number) {
		return this.api.get(
			`${this.urls.models}/${userId}`
		)
			.then((response) => response.data)
			.catch(err => {
				console.error("Error: ", err)
			});
	}

	public getModels() {
		return this.api.get(
			`${this.urls.models}`
		)
			.then((response) => response.data)
			.catch(err => {
				console.error("Error: ", err)
			});
	}
}