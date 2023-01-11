import { IMenu } from "./menu.interface";

let _id = Math.random();
export const MENU: IMenu[] = [
    {
        id: ++_id,
        title: 'Blog',
        url:'',
        type: 'text'
    },
    {
        id: ++_id,
        title: 'Contacts Us',
        url: '',
        type: 'text'

    },
    {
        id: ++_id,
        title: 'Sign Up',
        url: '',
        type: 'button'
    }
]