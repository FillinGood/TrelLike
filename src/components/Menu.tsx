import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export interface MenuProps {
  coords: [number, number];
  children: MenuItem[] | MenuItem;
}

function MenuComponent(props: MenuProps) {
  const items = Array.isArray(props.children) ? props.children : [props.children];
  return (
    <div className="menu" style={{ left: props.coords[0], top: props.coords[1] }}>
      {items.map((v, i) => (
        <div
          className="menu-item"
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            v.props.onClick();
          }}
        >
          <div className="menu-item--icon">
            <FontAwesomeIcon icon={v.props.icon} />
          </div>
          <div className="menu-item--label">{v.props.text}</div>
        </div>
      ))}
    </div>
  );
}

type MenuWrap = typeof MenuComponent & { Item: typeof MenuItemComponent };

const Menu = MenuComponent as MenuWrap;
Menu.Item = MenuItemComponent;
export default Menu;
