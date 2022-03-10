import { RouteModel } from "@core/types";

export const navRoutes: readonly RouteModel[] = [
	{
		href: "/models",
		title: "Models",
	} as const,
	{
		href: "/instruments",
		title: "Instruments",
	} as const,
] as const

const baseAuthRoute = "/auth";

export const authRoutes: readonly RouteModel[] = [
	{
		href: `${baseAuthRoute}/login`,
		title: "Login",
	} as const,
	{
		href: `${baseAuthRoute}/register`,
		title: "No account?",
	} as const,
] as const

export const userRoutes: readonly RouteModel[] = [
	{
		href: "/profile",
		title: "Profile",
	} as const
] as const