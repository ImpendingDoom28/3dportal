import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { ModelsRepository } from "@core/repositories";
import { MessageDto, ModelForm, PreparedModelForm } from "@core/types";

const repository = new ModelsRepository();

export const useUploadModel = () => {
	return useMutation<any, AxiosError<MessageDto>, ModelForm>(
		"profile-upload-model",
		(form) => {
			const formFile = form.files[0];
			return repository.uploadModel(formFile);
		},
		{}
	)
}