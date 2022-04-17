import React from "react";

import { Form, Header, Input } from "semantic-ui-react";
import { 
	PageContainer,
	Informer,
	Button
} from "@uiKit/index";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { useLogin, useRedirectIfLoggedIn } from "@services/AuthService";
import { useAuthStore } from "@stores/authStore";
import { navRoutes } from "@constants/routes";

import css from "./LoginPage.module.sass";

const LoginPage = () => {
	useRedirectIfLoggedIn();

	const {
		handleSubmit, 
		control,
	} = useForm();

	const { 
		mutateAsync,
		isError,
		isLoading,
		error,
		reset
	} = useLogin();

	const router = useRouter();

	const setTokens = useAuthStore((state) => state.setTokens);
	const onSubmit = async (data: any) => {
		reset();
		await mutateAsync(data)
			.then((res) => {
				setTokens(res.accessToken, res.refreshToken);
				router.push(navRoutes[0].href);
			});
	}

	return (
		<PageContainer>
			<Header 
				size="large"
				className={css.headliner}
				textAlign="right"
			>
				{"Уже есть аккаунт?"}
				<Header.Subheader>
					{"Добро пожаловать!"}
				</Header.Subheader>
			</Header>
			<Informer error={error} hidden={!isError} />
			<Form 
				onSubmit={handleSubmit(onSubmit)} 
				className={css.form}
			>
				<Form.Field>
					<label>{"Электронная почта:"}</label>
					<Controller
						control={control}
						name="email"
						render={
							({ field }) => {
								return (
									<Input 
										{...field}
										type="email"
										size="large" 
										placeholder="Your e-mail"
									/>
								)
							}
						}
					/>
				</Form.Field>
				<Form.Field>
					<label>{"Пароль:"}</label>
					<Controller
						control={control}
						name="password"
						render={
							({ field }) => {
								return (
									<Input 
										{...field}
										type="password"
										size="large" 
										placeholder="Your password" 
									/>
								)
							}
						}
					/>
				</Form.Field>
				<Button 
					type="submit" 
					fluid 
					positive
					loading={isLoading}
				>
					{"Войти !!!"}
				</Button>
			</Form>
		</PageContainer>
	);
}

export default LoginPage;