import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditItemAction } from '../redux/actions';
import { ColumnItemType, ColumnType, StoreState } from '../redux/types';
import { getItem } from '../redux/utils';

export interface ColumnItemPanelProps {
  item: ColumnItemType;
  onClose: () => void;
}

export default function ColumnItemPanel(props: ColumnItemPanelProps) {
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLDivElement>(null);
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

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      const description = e.currentTarget.innerText.trim();
      dispatch(
        EditItemAction(props.item.columnID, props.item.id, undefined, description)
      );
      e.currentTarget.innerHTML = description;
    },
    [props.item.columnID, props.item.id]
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
      <div className="panel-body">
        <div className="panel-content">
          <div className="panel-description">
            <div className="panel-description--header">
              <FontAwesomeIcon icon={'signature'} />
              <div>Description</div>
            </div>
            <div
              className="panel-description--value"
              onBlur={onBlur}
              ref={ref}
              contentEditable
            >
              {props.item.description}
            </div>
          </div>
        </div>
        <div className="panel-sidebar"></div>
      </div>
    </div>
  );
}
