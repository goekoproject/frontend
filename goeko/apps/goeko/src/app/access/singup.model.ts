export interface UserMetadata {
  userType: string
}

export class SignUp {
  email: string
  password: string
  user_metadata: UserMetadata
  constructor(email: string, password: string, userType: string) {
    this.email = email
    this.password = password
    this.user_metadata = {
      userType: userType,
    }
  }
}
