import React from "react";

import { Modal } from "semantic-ui-react";
import { Button } from "../Button";

import { useRouter } from "next/dist/client/router";
import { navRoutes } from "../../../constants";
import { useAuthStore } from "../../../stores";

export const LogoutButton = () => {
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
			onClose={onClose}
			onOpen={onOpen}
			open={open}
			trigger={
				<Button accented>
					{"Log out"}
				</Button>
			}
			closeIcon
		>
			<Modal.Header>
				{"Want to log out?"}
			</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
					{"If you log out, you will have to log in again in order to get to some features available only for logged in users"}
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button 
					onClick={onClose}
					color="black"
				>
					{"I changed my mind"}
				</Button>
				<Button
					content="Log out"
					labelPosition="right"
					icon="checkmark"
					onClick={onLogout}
					negative 
				/>
			</Modal.Actions>
		</Modal>
	)
}