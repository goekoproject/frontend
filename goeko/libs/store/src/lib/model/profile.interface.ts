import { LANG_PROFILE } from './../../../../../apps/goeko/src/app/profile/profile/profile-form';
import { DataSelect } from '../constants/select-data.constants'

type FieldForm =
  | 'text'
  | 'email'
  | 'password'
  | 'url'
  | 'select'
  | 'select-multiple'
  | 'file-link'
  | 'country'
  | 'number'
  | 'select-locations'
  | 'checkbox'
  | 'lang'

export interface Profile<T = 'cleantech' | 'sme' | 'bank'> {
  userType?: T
  controlName: string
  label: string
  type: FieldForm
  dataSelectKey?: keyof typeof DataSelect
  dataLangKey?: keyof typeof LANG_PROFILE
  className?: string
  required?: boolean
  placeholder?: string
}
