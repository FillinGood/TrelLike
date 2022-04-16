import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { StoreState, ColumnType } from '../redux/types';
import { getItem } from '../redux/utils';
import ColumnItem from './ColumnItem';
import { AddItemAction } from '../redux/actions';

export interface ColumnProps {
  id: number;
}

export default function Column(props: ColumnProps) {
  const dispatch = useDispatch();
  const column = useSelector<StoreState, ColumnType | null>((store) =>
    getItem(store.columns, props.id)
  );
  if (!column) return null;

  const ref = React.useRef<HTMLDivElement>(null);

  const [active, setActive] = React.useState(false);
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!e.currentTarget.innerText) return;
        dispatch(AddItemAction(column.id, e.currentTarget.innerText.trim()));
        e.currentTarget.innerHTML = '';
        setActive(false);
      }
    },
    [column.id]
  );
  const onActiveClick = React.useCallback(() => {
    if (!ref.current) return;
    if (!ref.current.innerText) return;
    dispatch(AddItemAction(column.id, ref.current.innerText.trim()));
    ref.current.innerHTML = '';
    setActive(false);
  }, [column.id]);
  const onIdleClick = React.useCallback(() => setActive(true), []);

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header--name">{column.name}</div>
      </div>
      <div className="column-items">
        {column.items.values.map((v) => (
          <ColumnItem item={v} key={v.id} />
        ))}
      </div>
      <div className={classNames('column-footer', { active })}>
        <div className="column-footer--idle" onClick={onIdleClick}>
          <FontAwesomeIcon icon={'plus'} />
          Add card
        </div>
        <div className="column-footer--active">
          <div className="textarea" contentEditable onKeyDown={onKeyDown} ref={ref} />
          <div className="button-add-item" onClick={onActiveClick}>
            Add
          </div>
        </div>
      </div>
    </div>
  );
}
