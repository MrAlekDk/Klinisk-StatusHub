export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    last_login: string | null;
    organisation_id: number;
}
