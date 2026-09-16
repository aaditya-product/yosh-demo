import { useEffect } from 'react';
import { useDispatch, useUi } from '../store';
import { Toast } from '../ui';

const ID = 'L-03';

export function ToastHost() {
  const { toast } = useUi();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => dispatch({ kind: 'dismissToast' }), toast.ms);
    return () => clearTimeout(id);
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-xl flex justify-center">
      <Toast
        idPrefix={ID}
        message={toast.message}
        actionLabel={toast.undo ? 'Undo' : undefined}
        actionId={`${ID}/undo`}
        onAction={toast.undo ? () => dispatch({ kind: 'undo' }) : undefined}
      />
    </div>
  );
}
