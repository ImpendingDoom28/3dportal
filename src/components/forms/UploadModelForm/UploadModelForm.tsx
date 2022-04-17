import React from "react";

import { Form, Header, Input, Label, Modal } from "semantic-ui-react";
import { Button } from "@uiKit/index";

import { Controller, useForm } from "react-hook-form";
import { useUploadModel } from "@core/services";
import { acceptedModelTypes } from "@constants/acceptedModelTypes";
import { ErrorMessage } from "@hookform/error-message";
import { FileDropZone } from "../../uiKit/FileDropZone";

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

	return (
		<Modal
			closeOnDimmerClick={false}
			onClose={() => resetForm()}
			closeIcon
			size={"tiny"}
			trigger={
				<Button
					primary
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