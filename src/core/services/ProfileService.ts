import { useQuery } from "react-query";

import { ProfileRepository } from "../repositories";

const repository = new ProfileRepository();

export const useProfileById = (id?: string) => {	
	return useQuery("profile-by-id", () => fetchProfileById(id), {
		retry: false
	})
}

export const fetchProfileById = (id?: string) => {
	if(id === undefined) return null;

	return repository.getProfileById(id);
}