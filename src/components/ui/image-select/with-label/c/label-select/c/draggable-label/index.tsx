import {useDraggable} from '@dnd-kit/core';
import {IconButton} from '@mui/material';
import {useState} from 'react';
import Iconify from 'src/components/iconify';

export type DraggableLabelProps = {
  identifier: {imageIdx: number; labelIdx: number};
  label: {x: number; y: number; text: string; index: number};
  handleLabelDelete: ({imageIdx, labelIdx}: {imageIdx: number; labelIdx: number}) => void;
};

export function DraggableLabel({identifier, label, handleLabelDelete}: DraggableLabelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `${identifier.imageIdx}-${identifier.labelIdx}`,
    data: identifier,
  });
  const style = transform ? {transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`} : undefined;

  return (
    <>
      <button
        type="button"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="label-style"
        style={{position: 'absolute', left: `${label.x - 5}%`, top: `${label.y - 5}%`, ...style, padding: 5, backgroundColor: 'white'}}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label.text}
      </button>

      {/* ラベルクリックした時に出現する削除ボタン */}
      {isOpen && (
        <IconButton
          sx={{
            position: 'absolute',
            top: `${label.y - 6}%`,
            left: `${label.x + 3}%`,
          }}
          onClick={() => handleLabelDelete(identifier)}
        >
          <Iconify icon="ic:baseline-close" width={33} style={{verticalAlign: 'middle', color: 'gray'}} />
        </IconButton>
      )}
    </>
  );
}
