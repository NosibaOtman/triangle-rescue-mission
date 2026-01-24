// משימת הצלת המשולשים - הודעות נרטיביות

import React from 'react';
import { motion } from 'framer-motion';

interface NarrativeMessageProps {
  message: string;
  type: 'success' | 'progress' | 'completion';
  isVisible: boolean;
}

/**
 * קומפוננטה להצגת הודעות נרטיביות קצרות
 */
export const NarrativeMessage: React.FC<NarrativeMessageProps> = ({
  message,
  type,
  isVisible,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-300';
      case 'progress':
        return 'bg-blue-100 border-blue-300';
      case 'completion':
        return 'bg-yellow-100 border-yellow-300';
      default:
        return 'bg-blue-100 border-blue-300';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'progress':
        return 'text-blue-800';
      case 'completion':
        return 'text-yellow-800';
      default:
        return 'text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'progress':
        return '→';
      case 'completion':
        return '🎉';
      default:
        return '→';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`border-2 rounded-lg p-4 ${getBackgroundColor()} flex items-center gap-3`}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-2xl">{getIcon()}</span>
      <p className={`font-semibold text-lg ${getTextColor()}`}>{message}</p>
    </motion.div>
  );
};

export default NarrativeMessage;
