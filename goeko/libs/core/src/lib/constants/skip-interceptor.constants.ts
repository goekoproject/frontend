import { HttpContext, HttpContextToken } from '@angular/common/http'

export const SKIP_INTERCEPTOR = new HttpContextToken(() => false)

export const SET_SKIP_INTERCEPTOR = new HttpContext().set(SKIP_INTERCEPTOR, true)
