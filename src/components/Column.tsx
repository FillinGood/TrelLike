import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState, ColumnType } from '../redux/types';
import { getItem } from '../redux/utils';
import ColumnItem from './ColumnItem';

export interface ColumnProps {
  id: number;
}

export default function Column(props: ColumnProps) {
  const column = useSelector<StoreState, ColumnType | null>((store) =>
    getItem(store.columns, props.id)
  );
  if (!column) return null;
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
      <div className="column-footer"></div>
    </div>
  );
}
