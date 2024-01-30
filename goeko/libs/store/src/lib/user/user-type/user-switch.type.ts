import { UserType } from '../user-type.constants';
import { CleantechsUser } from './cleantechs.model';
import { SmeUser } from './sme-user.model';

export type UserSwitch<T> = {
  [key in UserType]: T;
};

export type UserModal = SmeUser | CleantechsUser;
