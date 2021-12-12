import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { AuthRepository } from "../repositories/AuthRepository";

import { RegisterForm } from "../types/forms/RegisterForm.type";
import { Message } from "../types/message.type";

const repository = new AuthRepository();

export const useRegister = () => {
	return useMutation<Message, AxiosError<Message>, RegisterForm>(
		(data) => {
			return repository.register(data);
		}, 
		{}
	)
}

export const useLogin = () => {
	return useMutation<any, AxiosError<Message>, LoginForm>(
		(data) => {
			return repository.login(data);
		}
	)
}

export const useAuthentication = () => {}