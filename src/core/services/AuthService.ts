import { useMutation } from "react-query";
import { AuthRepository } from "@repositories/AuthRepository";

import { AxiosError } from "axios";
import { RegisterForm, LoginForm, MessageDto, LoginDto } from "@core/types";

const repository = new AuthRepository();

export const useRegister = () => {
	return useMutation<MessageDto, AxiosError<MessageDto>, RegisterForm>(
		(data) => {
			return repository.register(data);
		}, 
		{}
	)
}

export const useLogin = () => {
	/**
	 * <1> - What will return
	 * <2> - What will be if error
	 * <3> - What should be passed to 'mutate' func
	 *  */ 
	return useMutation<LoginDto, AxiosError<MessageDto>, LoginForm>(
		(data) => {
			return repository.login(data);
		}
	)
}

export const useAuthentication = () => {}