import React from "react";

import { Form, Input, Modal } from "semantic-ui-react";
import { Button, FileDropZone } from "@uiKit/index";
import { ErrorMessage } from "@hookform/error-message";

import { Controller, useForm } from "react-hook-form";
import { useUploadModel } from "@core/services";
import { acceptedModelTypes } from "@constants/acceptedModelTypes";

export const UploadModelForm: React.FC = () => {
	const { 
		handleSubmit, 
		control, 
		formState: { errors }, 
		reset: resetForm 
	} = useForm();

	const {
		mutateAsync,
		isLoading,
		reset
	} = useUploadModel();

	const onSubmit = async (data: any) => {
		reset();
		await mutateAsync(data)
	}
	const onClose = () => {
		resetForm()
	}

	return (
		<Modal
			closeOnDimmerClick={false}
			onClose={onClose}
			closeIcon
			size={"tiny"}
			trigger={
				<Button
					accented
				>
					{"Загрузить модель"}
				</Button>
			}	
		>
			<Modal.Header>
				{"Загрузить модель"}
			</Modal.Header>
			<Modal.Content>
				<Form
					onSubmit={handleSubmit(onSubmit)} 
					encType="multipart/form-data"
				>
					<Form.Field required>
						<label>{"Придумайте имя:"}</label>
						<Controller
							control={control}
							name="givenName"
							rules={{
								required: "Это поле обязательно"
							}}
							render={({ field }) =>
								<Input 
									error={!!errors[field.name]}
						   			name={field.name}
									onChange={field.onChange}
									type="text"
									size="large" 
								/>
							}
						/>
						<ErrorMessage 
							errors={errors}
							name="givenName"
							render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
						/>
					</Form.Field>
					<Form.Field required>
						<label>{"Файл:"}</label>
						<Controller
							control={control}
							name={"files"}
							rules={{
								required: "Это поле обязательно"
							}}
							render={({ field }) =>
								<FileDropZone 
									onChange={(value) => {
										field.onChange(value);
									}}
									name={field.name} 
									accept={acceptedModelTypes}
								/>
							}
						/>
						<ErrorMessage
							render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
							errors={errors} 
							name="files" 
						/>
					</Form.Field>
					<Button 
						type="submit" 
						animated
						loading={isLoading}
						positive
					>
						{"Загрузить"}
					</Button>
				</Form>
			</Modal.Content>
		</Modal>
	)
}