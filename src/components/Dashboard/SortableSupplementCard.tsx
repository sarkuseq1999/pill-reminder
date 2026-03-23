import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SupplementWithStatus } from '../../types';
import SupplementCard from './SupplementCard';

interface SortableSupplementCardProps {
  data: SupplementWithStatus;
  onTap: (supplementId: string, periodKey: string) => void;
  onViewHistory: (supplementId: string) => void;
  onUndoDose: (supplementId: string, periodKey: string) => void;
}

export default function SortableSupplementCard({ data, onTap, onViewHistory, onUndoDose }: SortableSupplementCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.supplement.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <SupplementCard
        data={data}
        onTap={onTap}
        onViewHistory={onViewHistory}
        onUndoDose={onUndoDose}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
