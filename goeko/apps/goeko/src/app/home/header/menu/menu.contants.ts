import { IMenu } from './menu.interface';

let _id = Math.random();
export const MENU: IMenu[] = [
  {
    id: ++_id,
    keyLang: 'MENU.aboutGoEKo',
    url: 'home/about',
    type: 'text',
  },
  {
    id: ++_id,
    keyLang: 'MENU.blog',
    url: 'administration',
    type: 'text',
  },
  {
    id: ++_id,
    keyLang: 'MENU.contanctUs',
    url: '',
    type: 'text',
  },
];
