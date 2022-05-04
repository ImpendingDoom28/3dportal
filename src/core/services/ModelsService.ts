import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ModelsRepository } from "@core/repositories";
import { MessageDto, ModelFileDto, ModelForm } from "@core/types";
import { useAuthStore } from "../../stores";

const repository = new ModelsRepository();

const queryKeys = {
	profileGetModels: "profile-get-models",
	profileUploadModel: "profile-upload-model",
	modelsGetModels: "models-get-models"
} as const

export const useUploadModel = () => {
	const {
		currentUser
	} = useAuthStore();

	const queryClient = useQueryClient();

	return useMutation<any, AxiosError<MessageDto>, ModelForm>(
		queryKeys.profileUploadModel,
		(form) => {
			const { files, givenName } = form;
			const model = files[0];
			return repository.uploadModel(
				model, 
				givenName, 
				currentUser?.id as unknown as number
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(queryKeys.profileGetModels)
			}
		}
	)
}

export const useGetUserModels = (id: number | undefined) => {
	return useQuery<any, AxiosError<MessageDto>, ModelFileDto[]>(
		[queryKeys.profileGetModels, id],
		() => {
			if(!id) return;
			return repository.getModelsByUserId(id);
		},
		{
			refetchOnWindowFocus: false
		}
	);
}

// TODO: Add filters
export const useGetModels = () => {
	return useQuery<any, AxiosError<MessageDto>, ModelFileDto[]>(
		queryKeys.modelsGetModels,
		() => {
			return repository.getModels();
		},
		{
			refetchOnWindowFocus: false
		}
	);
}