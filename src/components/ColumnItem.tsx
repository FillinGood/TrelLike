import React from 'react';
import { ColumnItemType } from '../redux/types';

export interface ColumnItemProps {
  item: ColumnItemType;
}
export default function ColumnItem(props: ColumnItemProps) {
  return <div className="column-item">{props.item.value}</div>;
}
