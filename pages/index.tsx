import React, { useEffect } from "react";

import { useRouter } from "next/dist/client/router";
import { routes } from "@constants/routes";

import type { NextPage } from "next";

const Home: NextPage = () => {

	const router = useRouter();

	useEffect(() => {
		router.push(routes[0].href);
	}, [router])

	return null;
}

export default Home
