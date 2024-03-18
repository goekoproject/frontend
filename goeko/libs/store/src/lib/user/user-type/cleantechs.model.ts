import { USER_TYPE } from '../user-type.constants';
import { Actor } from './actor.abstracts';

export class CleantechsUser extends Actor{
  override userType = USER_TYPE.CLEANTECH;
  link?: string;
  constructor() {
    super()
  }
}
