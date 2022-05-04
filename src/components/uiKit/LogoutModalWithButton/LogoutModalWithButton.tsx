import React from "react";

import { Modal } from "semantic-ui-react";
import { Button } from "@uiKit/index";

import { useRouter } from "next/dist/client/router";
import { navRoutes } from "@constants/index";
import { useAuthStore } from "@stores/authStore";

export const LogoutModalWithButton = () => {
	const [open, setOpen] = React.useState(false);

	const resetUser = useAuthStore((state) => state.resetStore);
	const router = useRouter();

	const onClose = () => setOpen(false);
	const onOpen = () => setOpen(true);

	const onLogout = () => {
		resetUser();
		router.push(navRoutes[0].href)
	}

	return (
		<Modal
			onOpen={onOpen}
			onClose={onClose}
			size={"tiny"}
			open={open}
			trigger={
				<Button 
					accented
				>
					{"Выйти"}
				</Button>
			}
			closeIcon
		>
			<Modal.Header>
				{"Хотите выйти из аккаунта?"}
			</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					{"Если вы выйдите, вам нужно будет заново войти, что бы получить доступ к возможностям, доступным только вошедшим пользователям"}
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button 
					onClick={onClose}
					color="black"
				>
					{"Я передумал"}
				</Button>
				<Button
					content={"Выйти"}
					labelPosition="right"
					icon="close"
					onClick={onLogout}
					negative 
				/>
			</Modal.Actions>
		</Modal>
	)
}