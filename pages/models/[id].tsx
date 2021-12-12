import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const SelectedModelPage: NextPage = (props) => {
	const router = useRouter()
  	const { id } = router.query

	return <div>{`selected model: ${id}`}</div>
}

SelectedModelPage.getInitialProps = (context) => {
	return {
		props: {
			id: context.query.id
		}
	}
}

export default SelectedModelPage;