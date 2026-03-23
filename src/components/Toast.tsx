import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 300); // wait for fade out
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible && !show) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
      show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    }`}>
      <div className="bg-slate-800 text-slate-200 px-5 py-3 rounded-xl shadow-lg text-sm font-medium border border-slate-700/50">
        {message}
      </div>
    </div>
  );
}
