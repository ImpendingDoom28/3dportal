import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const ProfilePageById: NextPage = (props) => {
	const router = useRouter()
  	const { id } = router.query

	return <div>{`selected profile: ${id}`}</div>
}

export default ProfilePageById;