import { UserTokenResponseModel } from "../models";

export type ModelFileDto = {
    givenName: string;
    modelUrl: string;
    generatedName: string;
    lastModified: string;
    mimeType: string;
    uploadDate: number;
    user: UserTokenResponseModel
}