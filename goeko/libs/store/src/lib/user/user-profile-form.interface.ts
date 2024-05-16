interface SelectLocation {
  code: string;
  label: string;
}

export interface UserProfileForm {
  name: string;
  identifier: string;
  country: SelectLocation;
  city: string;
  email: string;
  website: string;
  externalId: string;
  employees: number;
  phoneNumber: string;
  regions: Array<SelectLocation>;
}
