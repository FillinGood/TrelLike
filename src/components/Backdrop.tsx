import React from 'react';

export interface BackdropProps {
  onClick?: () => void;
}

export default function Backdrop(props: BackdropProps) {
  return <div className="backdrop" onClick={props.onClick}></div>;
}
