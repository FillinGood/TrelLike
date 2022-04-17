import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ColumnItemType } from '../redux/types';
import Backdrop from './Backdrop';
import Menu from './Menu';
import Portal from './Portal';

export interface ColumnItemProps {
  item: ColumnItemType;
}
export default function ColumnItem(props: ColumnItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isEdit, setEdit] = React.useState(false);
  const [coords, setCoords] = React.useState([0, 0]);

  const onEditClick = React.useCallback(() => {
    const rect = ref.current!.getBoundingClientRect();
    setCoords([rect.x, rect.y]);
    setEdit(true);
  }, []);

  const onCancel = React.useCallback(() => {
    setEdit(false);
  }, []);

  return (
    <div className="column-item" ref={ref}>
      <div className="column-item--name">{props.item.value} </div>
      <div className="column-item--button" onClick={onEditClick}>
        <FontAwesomeIcon icon={['far', 'pen-to-square']} />
      </div>
      {isEdit && (
        <Portal>
          <Backdrop onClick={onCancel} />
          <Menu>
            <Menu.Item
              icon={['far', 'pen-to-square']}
              text="menu item"
              onClick={() => {}}
            />
          </Menu>
        </Portal>
      )}
    </div>
  );
}
