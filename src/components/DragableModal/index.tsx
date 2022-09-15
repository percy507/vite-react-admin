import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import { useRef, useState } from 'react';
import type { DraggableBounds, DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

interface DragableModalProps extends ModalProps {}

export function DragableModal(props: DragableModalProps) {
  const { children, ...restProps } = props;

  const [bounds, setBounds] = useState<DraggableBounds>();
  const draggleRef = useRef<HTMLDivElement>(null);

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) return;
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      {...restProps}
      modalRender={(modal) => (
        <Draggable bounds={bounds} onStart={(event, uiData) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}>
      {children}
    </Modal>
  );
}
