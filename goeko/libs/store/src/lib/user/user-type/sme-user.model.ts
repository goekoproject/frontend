import { USER_TYPE } from '../user-type.constants';
import { Actor } from './actor.abstracts';

export interface Country {
  country: { code: string; regions: string[] };
}

export class SmeUser extends Actor {
  override userType = USER_TYPE.SME;
  website?: string;
  locations!: Array<Country>;
  employees!: string;
  constructor() {
    super();
  }
}
