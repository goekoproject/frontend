import { IMenu } from './menu.interface'

export const _buildSubmenu = (menu: IMenu[], code: string, submenu: any) =>
  menu.map((item) => {
    return item.code === code
      ? ({
          ...item,
          submenu,
        } as IMenu)
      : item
  })
