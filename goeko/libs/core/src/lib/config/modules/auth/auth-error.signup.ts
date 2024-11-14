export type ErrorCode = 'PasswordStrengthError' | 'BadRequestError'
export enum TypeErrorCode {
  PASSSWORD_STRENGTH_ERROR = 'PasswordStrengthError',
  BAD_REQUEST_ERROR = 'BadRequestError',
}

export interface ErrorSignUp {
  code: ErrorCode
  description: string | null
  name: ErrorCode
}

const errorMessages: Record<ErrorCode, string> = {
  BadRequestError: 'ERROR_MESSAGES.invalid_signup_user_exists',
  PasswordStrengthError: 'ERROR_MESSAGES.password_strength',
}

export const errorMessageSignUp = (err: ErrorSignUp): string => {
  if (err.description === null) {
    return 'Signup failed'
  }

  return errorMessages[err.name] || err.description || 'An unknown error occurred.'
}
