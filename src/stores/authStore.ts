import create from "zustand";

import Cookies from "js-cookie";
import { UserTokenResponseModel } from "@core/types/models";
import { AccessTokenBody } from "@core/types/utility";
 
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
		if(accessToken) {
			Cookies.set("accessToken", accessToken);

			const userInfo: AccessTokenBody = JSON.parse(atob( accessToken?.split(".")[1]));

			set({ currentUser: {
				email: userInfo.email,
				id: userInfo.sub
			} })
		}
		set({ accessToken })
	},
	setRefreshToken: (refreshToken: AuthStoreType["refreshToken"]) => {
		if(refreshToken) Cookies.set("refreshToken", refreshToken);
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
		if(!get().isInitialised) {
			const allCookies = Cookies.get();
			get().setAccessToken(allCookies["accessToken"]);
			get().setRefreshToken(allCookies["refreshToken"]);
			set({ isInitialised: true });
		}
	},
	resetStore: () => {
		Cookies.remove("accessToken");
		Cookies.remove("refreshToken");
		set({
			currentUser: null,
			accessToken: null,
			refreshToken: null
		})
	}
}));