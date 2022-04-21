import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DelItemAction, InsertItemAction } from '../redux/actions';
import { ColumnItemType, ColumnType, StoreState } from '../redux/types';
import { getIndex, getItem } from '../redux/utils';
import Backdrop from './Backdrop';
import ColumnItemPanel from './ColumnItemPanel';
import Menu from './Menu';
import Portal from './Portal';

export interface ColumnItemProps {
  item: ColumnItemType;
}
export default function ColumnItem(props: ColumnItemProps) {
  const dispatch = useDispatch();
  const column = useSelector<StoreState, ColumnType>(
    (s) => getItem(s.columns, props.item.columnID)!
  );
  const ref = React.useRef<HTMLDivElement>(null);
  const [isPanelOpen, setPanelOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [bounds, setBounds] = React.useState<DOMRect>(new DOMRect());

  const onEditClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = ref.current!.getBoundingClientRect();
    setBounds(rect);
    setEdit(true);
  }, []);

  const onClick = React.useCallback(() => {
    setPanelOpen(true);
  }, []);

  const onCancel = React.useCallback(() => {
    setEdit(false);
    setPanelOpen(false);
    console.log('onCancle');
  }, []);

  const onOpenClick = React.useCallback(() => {
    setEdit(false);
    setPanelOpen(true);
  }, []);

  const onDuplicateClick = React.useCallback(() => {
    setEdit(false);
    const index = getIndex(column.items, props.item.id);
    dispatch(InsertItemAction(column.id, props.item.value, index + 1));
  }, [column.items, props.item.id, column.id, props.item.value]);

  const onDeleteClick = React.useCallback(() => {
    setEdit(false);
    dispatch(DelItemAction(props.item.columnID, props.item.id));
  }, [props.item.columnID, props.item.id]);

  return (
    <div className="column-item" ref={ref} onClick={onClick}>
      <div className="column-item--name">{props.item.value} </div>
      <div className="column-item--button" onClick={onEditClick}>
        <FontAwesomeIcon icon={['far', 'pen-to-square']} />
      </div>
      {isEdit && (
        <Portal>
          <Backdrop onClick={onCancel} />
          <Menu coords={[bounds.right, bounds.top]}>
            <Menu.Item icon={'bars'} text="Open" onClick={onOpenClick} />
            <Menu.Item icon={'clone'} text="Duplicate" onClick={onDuplicateClick} />
            <Menu.Item icon={'trash-can'} text="Delete" onClick={onDeleteClick} />
          </Menu>
        </Portal>
      )}
      {isPanelOpen && (
        <Portal className="panel-portal">
          <Backdrop onClick={onCancel} />
          <ColumnItemPanel item={props.item} onClose={onCancel} />
        </Portal>
      )}
    </div>
  );
}
