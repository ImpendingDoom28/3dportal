import create from "zustand";

import Cookies from "js-cookie";
import { UserTokenResponseModel, AccessTokenBody } from "@core/types";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "@constants/index";
 
type AuthStoreType = {
	currentUser: UserTokenResponseModel | null,
	accessToken: string | null,
	refreshToken: string | null,
	isInitialised: boolean,
	setAccessToken: (accessToken: AuthStoreType["accessToken"]) => void,
	setRefreshToken: (refreshToken: AuthStoreType["refreshToken"]) => void,
	setTokens: (accessToken: AuthStoreType["accessToken"], refreshToken: AuthStoreType["refreshToken"]) => void,
	initStore: () => void;
	resetStore: () => void;
}

export const useAuthStore = create<AuthStoreType>((set, get) => ({
	currentUser: null,
	accessToken: null,
	refreshToken: null,
	isInitialised: false,
	setAccessToken: (accessToken: AuthStoreType["accessToken"]) => {
		if (accessToken) {
			Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken);

			const userInfo: AccessTokenBody = JSON.parse(atob(accessToken?.split(".")[1]));

			set({
				currentUser: {
					email: userInfo.email,
					id: userInfo.sub
				}
			})
		}
		set({ accessToken })
	},
	setRefreshToken: (refreshToken: AuthStoreType["refreshToken"]) => {
		if (refreshToken) Cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
		set({ refreshToken })
	},
	setTokens: (accessToken: AuthStoreType["accessToken"], refreshToken: AuthStoreType["refreshToken"]) => {
		get().setAccessToken(accessToken);
		get().setRefreshToken(refreshToken);
	},
	setInitiliased: (isInitialised: AuthStoreType["isInitialised"]) => {
		set({ isInitialised })
	},
	initStore: () => {
		if (!get().isInitialised) {
			const allCookies = Cookies.get();
			get().setAccessToken(allCookies[ACCESS_TOKEN_COOKIE_NAME]);
			get().setRefreshToken(allCookies[REFRESH_TOKEN_COOKIE_NAME]);
			set({ isInitialised: true });
		}
	},
	resetStore: () => {
		Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
		Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
		set({
			currentUser: null,
			accessToken: null,
			refreshToken: null
		})
	}
}));