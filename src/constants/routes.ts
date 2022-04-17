import { RouteModel } from "@core/types";

export const navRoutes: readonly RouteModel[] = [
	{
		href: "/models",
		title: "Модели",
	} as const,
	{
		href: "/instruments",
		title: "Инструменты",
	} as const,
] as const

const baseAuthRoute = "/auth";

export const authRoutes: readonly RouteModel[] = [
	{
		href: `${baseAuthRoute}/login`,
		title: "Войти",
	} as const,
	{
		href: `${baseAuthRoute}/register`,
		title: "Нет аккаунта?",
	} as const,
] as const

export const userRoutes: readonly RouteModel[] = [
	{
		href: "/profile",
		title: "Профиль",
	} as const
] as const