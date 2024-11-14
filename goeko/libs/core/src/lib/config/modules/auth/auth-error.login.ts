type ErrorCode =
  | 'access_denied'
  | 'password_change_required'
  | 'password_leaked'
  | 'too_many_attempts'
  | 'session_missing'
  | 'too_many_requests'
  | 'invalid_password'
  | 'password_dictionary_error'
  | 'password_no_user_info_error'
  | 'password_strength_error'
  | 'user_exists'
  | 'username_exists'
  | 'social_signup_needs_terms_acception'

export interface ErrorLogin {
  code: ErrorCode
  description: string | null
}

const errorMessages: Record<ErrorCode, string> = {
  access_denied: 'invalid_user_password',
  password_change_required: 'password_change_required',
  password_leaked: 'password_leaked',
  too_many_attempts: 'too_many_attempts',
  session_missing: 'session_missing',
  too_many_requests: 'too_many_requests',
  invalid_password: 'invalid_password',
  password_dictionary_error: 'password_dictionary_error',
  password_no_user_info_error: 'password_no_user_info_error',
  password_strength_error: 'password_strength_error',
  user_exists: 'user_exists',
  username_exists: 'username_exists',
  social_signup_needs_terms_acception: 'social_signup_needs_terms_acception',
}

export const errorMessagelogin = (err: ErrorLogin): string => {
  if (err.description === null) {
    return 'Login failed'
  }

  return errorMessages[err.code] || err.description || 'An unknown error occurred.'
}
