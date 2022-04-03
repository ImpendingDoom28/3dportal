import React from "react";

import { Form, Header, Input } from "semantic-ui-react";
import { Button } from "@uiKit/index";

import { Controller, useForm } from "react-hook-form";
import { useUploadModel } from "@core/services";
import { acceptedModelTypes } from "@constants/acceptedModelTypes";


export const AddModelForm: React.FC = () => {
	const { handleSubmit, control } = useForm();
	const {
		mutateAsync,
		reset
	} = useUploadModel();

	const onSubmit = async (data: any) => {
		reset();
		await mutateAsync(data)
	}

	const fileUploadLabel = acceptedModelTypes.replaceAll(".", "").toUpperCase();

	return (
		<Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
			<Header 
				size="medium"
				textAlign="center"
			>
				{"Upload your model"}
			</Header>
			<Form.Field>
				<label>{"Come up with a name:"}</label>
				<Controller
					control={control}
					name="givenName"
					render={({ field }) =>
						<Input 
						    name={field.name}
							onChange={field.onChange}
							type="text"
							size="large" 
						/>
					}
				/>
			</Form.Field>
			<Form.Field>
				<Controller
					control={control}
					name="files"
					render={({ field }) =>
						<Input 
						    name={field.name}
							onChange={(value) => {
								field.onChange(value.target.files);
							}}
							type="file"
							size="large" 
							accept={acceptedModelTypes}
							label={fileUploadLabel}
							labelPosition={"right"}
						/>
					}
				/>
			</Form.Field>
			<Button 
				type="submit" 
				fluid 
				positive
			>
				{"Upload"}
			</Button>
		</Form>
	)
}