import React from 'react';

export interface BackdropProps {
  onClick?: () => void;
}

export default function Backdrop(props: BackdropProps) {
  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      props.onClick?.();
    },
    [props.onClick]
  );
  return <div className="backdrop" onClick={onClick}></div>;
}
