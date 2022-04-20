import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { ColumnItemType, ColumnType, StoreState } from '../redux/types';
import { getItem } from '../redux/utils';

export interface ColumnItemPanelProps {
  item: ColumnItemType;
  onClose: () => void;
}

export default function ColumnItemPanel(props: ColumnItemPanelProps) {
  const column = useSelector<StoreState, ColumnType>(
    (s) => getItem(s.columns, props.item.columnID)!
  );

  const onClose = React.useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      props.onClose();
    },
    [props.onClose]
  );

  return (
    <div className="column-item-panel">
      <div className="panel-header">
        <FontAwesomeIcon icon={'bars'} className="panel-header--icon" />
        <div>
          <div className="panel-header--name">{props.item.value}</div>
          <div className="panel-header--parent">in column {column.name}</div>
        </div>
        <FontAwesomeIcon
          icon={'xmark'}
          className="panel-header--close"
          onClick={onClose}
        />
      </div>
      <div className="panel-body"></div>
    </div>
  );
}
