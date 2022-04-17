import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export interface MenuProps {
  children: MenuItem[] | MenuItem;
}

export interface MenuItemProps {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

class MenuItemComponent extends React.Component<MenuItemProps> {
  render() {
    return null;
  }
}

type MenuItem = React.CElement<MenuItemProps, MenuItemComponent>;

function MenuComponent(props: MenuProps) {
  return <div className="menu"></div>;
}

type MenuWrap = typeof MenuComponent & { Item: typeof MenuItemComponent };

const Menu = MenuComponent as MenuWrap;
Menu.Item = MenuItemComponent;
export default Menu;
