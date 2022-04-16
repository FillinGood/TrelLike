import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState, ColumnType } from '../redux/types';
import { getItem } from '../redux/utils';
import ColumnItem from './ColumnItem';
import { AddItemAction } from '../redux/actions';
import ColumnInput from './ColumnInput';

export interface ColumnProps {
  id: number;
}

export default function Column(props: ColumnProps) {
  const dispatch = useDispatch();
  const column = useSelector<StoreState, ColumnType | null>((store) =>
    getItem(store.columns, props.id)
  );
  if (!column) return null;

  const onEnter = React.useCallback(
    (v: string) => dispatch(AddItemAction(column.id, v)),
    [column.id]
  );

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
      <ColumnInput onEnter={onEnter} label="Add new item" />
    </div>
  );
}
