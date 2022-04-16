import React from 'react';
import { useSelector } from 'react-redux';
import { ColumnCollection, StoreState } from '../redux/types';
import Column from './Column';

export default function ColumnSpace() {
  const columns = useSelector<StoreState, ColumnCollection>((s) => s.columns);
  return (
    <div className="column-space">
      {columns.values.map((v) => (
        <Column key={v.id} id={v.id} />
      ))}
    </div>
  );
}
