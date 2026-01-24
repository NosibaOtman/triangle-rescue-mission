// משימת הצלת המשולשים - קומפוננטת לוח משוב

import React from 'react';
import type { FeedbackType } from '@/types/game';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface FeedbackPanelProps {
  type: FeedbackType;
  title: string;
  message: string;
  explanation?: string;
  onContinue: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
}

/**
 * קומפוננטה להצגת משוב חינוכי
 */
export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  type,
  title,
  message,
  explanation,
  onContinue,
  onRetry,
  showRetry = false,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'correct':
        return 'bg-green-50 border-green-200';
      case 'incorrect':
        return 'bg-red-50 border-red-200';
      case 'hint':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'correct':
        return 'text-green-900';
      case 'incorrect':
        return 'text-red-900';
      case 'hint':
        return 'text-amber-900';
      default:
        return 'text-blue-900';
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'correct':
        return 'text-green-700';
      case 'incorrect':
        return 'text-red-700';
      case 'hint':
        return 'text-amber-700';
      default:
        return 'text-blue-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'correct':
        return <CheckCircle className="w-12 h-12 text-green-600" />;
      case 'incorrect':
        return <XCircle className="w-12 h-12 text-red-600" />;
      case 'hint':
        return <Lightbulb className="w-12 h-12 text-amber-600" />;
      default:
        return null;
    }
  };

  const getAnimationVariant = () => {
    if (type === 'incorrect') {
      return {
        initial: { x: -20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
      };
    }
    return {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.3 },
    };
  };

  const getRetryButtonClass = () => {
    const baseClass = 'font-semibold';
    if (type === 'correct') {
      return `${baseClass} border-green-300 text-green-700 hover:bg-green-100`;
    } else if (type === 'incorrect') {
      return `${baseClass} border-red-300 text-red-700 hover:bg-red-100`;
    }
    return `${baseClass} border-amber-300 text-amber-700 hover:bg-amber-100`;
  };

  const getContinueButtonClass = () => {
    const baseClass = 'font-semibold';
    if (type === 'correct') {
      return `${baseClass} bg-green-600 hover:bg-green-700 text-white`;
    } else if (type === 'incorrect') {
      return `${baseClass} bg-red-600 hover:bg-red-700 text-white`;
    }
    return `${baseClass} bg-amber-600 hover:bg-amber-700 text-white`;
  };

  return (
    <motion.div
      className={`border-2 rounded-lg p-6 ${getBackgroundColor()}`}
      initial={getAnimationVariant().initial}
      animate={getAnimationVariant().animate}
      transition={getAnimationVariant().transition}
    >
      <div className="flex gap-4">
        {/* אייקון */}
        <div className="flex-shrink-0">{getIcon()}</div>
        
        {/* תוכן */}
        <div className="flex-grow">
          <h2 className={`text-2xl font-bold ${getTitleColor()} mb-2`}>{title}</h2>
          <p className={`${getTextColor()} text-lg mb-2`}>{message}</p>
          
          {explanation && (
            <p className={`${getTextColor()} text-sm opacity-90 mb-4`}>{explanation}</p>
          )}
          
          {/* כפתורים */}
          <div className="flex gap-3 mt-4">
            {showRetry && onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                className={getRetryButtonClass()}
              >
                נסה שוב
              </Button>
            )}
            
            <Button
              onClick={onContinue}
              className={getContinueButtonClass()}
            >
              {showRetry ? 'המשך' : 'אוקיי'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackPanel;
