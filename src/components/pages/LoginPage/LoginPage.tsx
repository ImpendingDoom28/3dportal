import React from 'react';

import { Form, Header, Input } from "semantic-ui-react";
import PageContainer from '../../uiKit/PageContainer';
import Informer from '../../uiKit/Informer';
import Button from '../../uiKit/Button';

import { Controller, useForm } from 'react-hook-form';
import { useLogin } from '../../../core/services/AuthService';
import { useRouter } from 'next/dist/client/router';
import { authRoutes } from '../../../constants/routes';

import { MessageType } from '../../../core/types/message.type';

import css from "./LoginPage.module.sass";

const LoginPage = () => {
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

	const onSubmit = async (data: any) => {
		reset();
		await mutateAsync(data)
			.then((res) => {
				if (res.type === MessageType.SUCCESS.toUpperCase()) {
					console.log(authRoutes[0].href)
					router.push(authRoutes[0].href)
				}
			})
	}

	return (
		<PageContainer>
			<Header 
				size="large"
				className={css.headliner}
				textAlign="right"
			>
				{"Have an account?"}
				<Header.Subheader>
					{"Please welcome!"}
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
					type='submit' 
					fluid 
					positive
					loading={isLoading}
				>
					{"Login !!!"}
				</Button>
			</Form>
		</PageContainer>
	);
}

export default LoginPage;