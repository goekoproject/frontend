export interface UserMetadata {
	userType: string;
}

export interface SignUp {
	email: string;
	password: string;
	user_metadata: UserMetadata;
	connection: string;
}
