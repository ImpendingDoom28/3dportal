import { useQuery } from "react-query";

import { ProfileRepository } from "../repositories";

const repository = new ProfileRepository();

const queryKeys = {
	profileById: "profile-by-id"
}

export const useProfileById = (id?: string) => {
	return useQuery(
		[queryKeys.profileById],
		() => fetchProfileById(id),
		{
			retry: false,
			refetchOnWindowFocus: false,
		}
	)
}
export const fetchProfileById = (id?: string) => {
	if (!id) return null;

	return repository.getProfileById(id);
}