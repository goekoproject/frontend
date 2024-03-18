import { USER_TYPE } from '../user-type.constants';
import { Actor } from './actor.abstracts';

export class SmeUser extends Actor {
  override userType = USER_TYPE.SME;
  website?: string;
  constructor() {
    super();
  }
}
