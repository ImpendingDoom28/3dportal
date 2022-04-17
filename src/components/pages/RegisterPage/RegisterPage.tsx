import React from "react";

import { Form, Header, Input } from "semantic-ui-react";
import { 
	PageContainer,
	Informer,
	Button
} from "@uiKit/index";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { useRedirectIfLoggedIn, useRegister } from "@services/AuthService";
import { authRoutes } from "@constants/routes";

import { MessageType } from "@core/types";

import css from "./RegisterPage.module.sass";

const RegisterPage = () => {
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
	} = useRegister();

	const router = useRouter();

	const onSubmit = async (data: any) => {
		reset();
		await mutateAsync(data)
			.then((res) => {
				if (res.type === MessageType.SUCCESS.toUpperCase()) {
					router.push(authRoutes[0].href)
				}
			})
	}

	return (
		<PageContainer>
			<Header 
				size="large"
				className={css.headliner}
			>
				{"Давайте к нам!"}
				<Header.Subheader>
					{"Уникальные возможности ждут впереди"}
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
										placeholder="Ваш пароль" 
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
					{"Зарегистрироваться"}
				</Button>
			</Form>
		</PageContainer>
	);
}

export default RegisterPage;