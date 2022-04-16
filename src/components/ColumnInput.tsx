import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

export interface ColumnInputProps {
  label: string;
  onEnter: (value: string) => void;
}

export default function ColumnInput(props: ColumnInputProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [active, setActive] = React.useState(false);
  const onKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!e.currentTarget.innerText) return;
      props.onEnter?.(e.currentTarget.innerText.trim());
      e.currentTarget.innerHTML = '';
      setActive(false);
    }
  }, []);
  const onActiveClick = React.useCallback(() => {
    if (!ref.current) return;
    if (!ref.current.innerText) return;
    props.onEnter?.(ref.current.innerText.trim());
    ref.current.innerHTML = '';
    setActive(false);
  }, []);
  const onIdleClick = React.useCallback(() => {
    setActive(true);
    setTimeout(() => ref.current?.focus(), 0);
  }, []);

  return (
    <div className={classNames('column-input', { active })}>
      <div className="column-input--idle" onClick={onIdleClick}>
        <FontAwesomeIcon icon={'plus'} />
        {props.label}
      </div>
      <div className="column-input--active">
        <div className="textarea" contentEditable onKeyDown={onKeyDown} ref={ref} />
        <div className="button-add" onClick={onActiveClick}>
          Add
        </div>
      </div>
    </div>
  );
}
