export interface UserMetadata {
	userType: string;
}

export class SignUp {
	email: string;
	password: string;
	user_metadata: UserMetadata;
	connection: string;
	constructor(email: string, password: string, userType: string, connection = 'goeko-users') {
		this.email = email;
		this.connection = connection;
		this.password = password;
		this.user_metadata = {
			userType: userType,
		};
	}
}
