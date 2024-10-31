/* interface SelectLocation {
  code: string;
  label: string;
} */

export interface UserProfileForm {
  name: string;
  identifier: string;
  country: any;
  city: string;
  email: string;
  website: string;
  externalId: string;
  employees: number;
  phoneNumber: string;
  comunicationLanguage: any;
  locations: any[];
}
