export interface AuthResponse {
    /**
     * Auth token
     */
     authorities: string[];
     exp: number;
     givenName: string;
     displayName: string;
     iat: number;
     mail: string;
     sub: string;
}