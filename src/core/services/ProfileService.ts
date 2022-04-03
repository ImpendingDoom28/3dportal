import { useQuery } from "react-query";

import { ProfileRepository } from "../repositories";

const repository = new ProfileRepository();

export const useProfileById = (id?: string) => {
	return useQuery(
		"profile-by-id", 
		() => fetchProfileById(id), 
		{
			retry: false,
			refetchOnWindowFocus: false,
		}
	)
}

export const fetchProfileById = (id?: string) => {
	if(!id) return null;

	return repository.getProfileById(id);
}