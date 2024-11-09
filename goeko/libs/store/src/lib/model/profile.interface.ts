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
  className?: string
  required?: boolean
  placeholder?: string
}
