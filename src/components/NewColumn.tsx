import React from 'react';
import { useDispatch } from 'react-redux';
import { AddColumnAction } from '../redux/actions';
import ColumnInput from './ColumnInput';

export default function NewColumn() {
  const dispatch = useDispatch();

  const onEnter = React.useCallback((v: string) => dispatch(AddColumnAction(v)), []);

  return (
    <div className="new-column">
      <ColumnInput label="Add new column" onEnter={onEnter} />
    </div>
  );
}
