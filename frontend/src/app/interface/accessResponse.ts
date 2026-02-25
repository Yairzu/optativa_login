export interface accessResponse {
    access_token: string;
    message: string;
    user: {
        id_rol: number
        email_user: string;
    }
}