import React from "react";

import { Form, Header, Input } from "semantic-ui-react";
import { 
	PageContainer,
	Informer,
	Button
} from "@uiKit/index";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { useRegister } from "@services/AuthService";
import { authRoutes } from "@constants/routes";

import { MessageType } from "@core/types";

import css from "./RegisterPage.module.sass";

const RegisterPage = () => {
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
				{"Join us now!"}
				<Header.Subheader>
					{"Unique features ahead"}
				</Header.Subheader>
			</Header>
			<Informer error={error} hidden={!isError} />
			<Form 
				onSubmit={handleSubmit(onSubmit)} 
				className={css.form}
			>
				<Form.Field>
					<label>{"E-mail address:"}</label>
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
					<label>{"Password:"}</label>
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
					{"Register"}
				</Button>
			</Form>
		</PageContainer>
	);
}

export default RegisterPage;