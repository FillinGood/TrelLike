import React from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
}

export default function Portal(props: PortalProps) {
  const mount = document.getElementById('portal-root')!;
  const el = document.createElement('div');

  React.useEffect(() => {
    mount.appendChild(el);
    return () => void mount.removeChild(el);
  }, [el, mount]);

  return createPortal(props.children, el);
}
