export interface accessResponse {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    message?: string;
    user?: {
        id_user: number;
        id_rol: number;
        name_user?: string;
        surname_user?: string;
        nick_user: string;
    };
}