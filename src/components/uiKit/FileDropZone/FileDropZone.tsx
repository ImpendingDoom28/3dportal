import React, { useState } from "react";

import { Icon, Label } from "semantic-ui-react";

import css from "./FileDropZone.module.sass";

type FileDropZoneProps = {
	name: string,
	accept?: string;
	onChange: (files: File[] | null) => void;
}

export const FileDropZone = React.forwardRef<HTMLInputElement, FileDropZoneProps>((
	{
		name,
		accept,
		onChange
	}, ref)  => {

	const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
	const [hovered, setHovered] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const fileUploadLabel = accept?.replaceAll(".", "").toUpperCase() ?? "Любой";

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		// @ts-ignore
		const filteredFilesByAcceptedTypes = [...event.dataTransfer.files]
			.filter((file: File) => {
				const fileType = file.name.substring(file.name.lastIndexOf("."));

				if(accept?.includes(fileType)) {
					return true
				}
				return false;
			}) as File[];

		if(filteredFilesByAcceptedTypes.length > 0) {
			setSelectedFiles(filteredFilesByAcceptedTypes);
			onChange(filteredFilesByAcceptedTypes);
			setErrorMessage(null);
		} else {
			setSelectedFiles(null);
			onChange(null);
			setErrorMessage("Неправильный формат файла.");
		}
		setHovered(false);
	}
	const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setHovered(true);
	}
	const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setHovered(false);
	}
	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// @ts-ignore
		const files = [...event.target.files] as File[]
		setSelectedFiles(files)
		onChange(files);
	};

	return (
		<div 
			className={css.dropZone}
			style={hovered ? {
				color: "rgba(0, 0, 0, 0.6)"
			} : undefined}
			onDrop={onDrop}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
		>
			<input 
				className={css.input}
				id={name}
				ref={ref}
				name={name}
				accept={accept}
				onChange={onInputChange}
				type={"file"}
			/>
			<label 
				htmlFor={name}
				className={css.labelContainer}
			>
				<div className={css.label}>
					{selectedFiles && (
						<div className={css.selectedFile}>
							{`Выбранный файл: ${selectedFiles[0].name}`}
						</div>
					)}
					{errorMessage &&
						<div className={css.selectedFile}>
							{errorMessage}
						</div>
					}
					{!selectedFiles && !errorMessage && (
						<>
							<Icon
								size={!hovered ? "large" : "huge"}
								name="file"
							/>
							{!hovered && (
								<>
									<span>{"Перетащите файл сюда или "}</span>
									<span>{"нажмите, чтобы выбрать..."}</span>
								</>
							)}
						</>
					)}
				</div>
			</label>
			{!hovered && (
				<Label
					className={css.formatsLabel}
				>
					{`Поддерживаемые форматы: ${fileUploadLabel}`}
				</Label>
			)}
		</div>
	);
});

FileDropZone.displayName = "FileDropZone";