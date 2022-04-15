import React from 'react';
import { useSelector } from 'react-redux';
import { ColumnCollection, StoreState } from '../redux/types';
import { mapCollection } from '../redux/utils';
import Column from './Column';

export default function ColumnSpace() {
  const columns = useSelector<StoreState, ColumnCollection>((s) => s.columns);
  return (
    <div className="column-space">
      {mapCollection(columns, (c, k) => (
        <Column key={k} id={c.id} />
      ))}
    </div>
  );
}
