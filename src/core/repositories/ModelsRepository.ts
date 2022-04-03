import { ModelsUrls } from "@core/urls";
import { BaseRepository } from "./BaseRepository";

export class ModelsRepository extends BaseRepository<ModelsUrls> {

	constructor () {
		super(new ModelsUrls());
	}

	// Should be send as multipart/form-data
	public uploadModel(model: File, givenName: string) {
		const formData = new FormData();
		formData.append("model", model, model.name);
		formData.append("lastModified", `${model.lastModified}`)
		formData.append("givenName", givenName);
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
}