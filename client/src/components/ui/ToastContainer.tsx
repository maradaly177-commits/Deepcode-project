import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useAppStore();

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
            default:
                return <Info className="w-5 h-5 text-sky-400 shrink-0" />;
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto flex items-start gap-3 p-4 bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl backdrop-blur text-slate-100"
                    >
                        {getIcon(toast.type)}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-100">{toast.title}</h4>
                            {toast.message && (
                                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.message}</p>
                            )}
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-slate-500 hover:text-slate-300 p-1 rounded-md transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
