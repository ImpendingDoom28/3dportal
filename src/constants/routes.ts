import { Route } from "../core/types/route.type";

export const routes: readonly Route[] = [
	{
		href: "/models",
		title: "Models",
	} as const,
	{
		href: "/instruments",
		title: "Instruments",
	} as const,
] as const

const baseAuthRoute = '/auth';

export const authRoutes: readonly Route[] = [
	{
		href: `${baseAuthRoute}/login`,
		title: "Login",
	} as const,
	{
		href: `${baseAuthRoute}/register`,
		title: "No account?",
	} as const,
] as const