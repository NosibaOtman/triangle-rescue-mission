// משימת הצלת המשולשים - קומפוננטת כפתורי תשובות

import React from 'react';
import type { AngleType, SideType } from '@/types/game';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AnswerButtonsProps {
  onAngleSelect: (angle: AngleType) => void;
  onSideSelect: (side: SideType) => void;
  selectedAngle?: AngleType;
  selectedSide?: SideType;
  disabled?: boolean;
}

const angleOptions: { value: AngleType; label: string; description: string }[] = [
  {
    value: 'acute',
    label: 'חד (Acute)',
    description: 'כל הזוויות < 90°',
  },
  {
    value: 'right',
    label: 'ישר (Right)',
    description: 'זווית אחת = 90°',
  },
  {
    value: 'obtuse',
    label: 'קהה (Obtuse)',
    description: 'זווית אחת > 90°',
  },
];

const sideOptions: { value: SideType; label: string; description: string }[] = [
  {
    value: 'scalene',
    label: 'שונה צלעות (Scalene)',
    description: 'כל הצלעות שונות',
  },
  {
    value: 'isosceles',
    label: 'שווה שוקיים (Isosceles)',
    description: 'שתי צלעות שוות',
  },
  {
    value: 'equilateral',
    label: 'שווה צלעות (Equilateral)',
    description: 'כל הצלעות שוות',
  },
];

/**
 * קומפוננטה לבחירת תשובות
 */
export const AnswerButtons: React.FC<AnswerButtonsProps> = ({
  onAngleSelect,
  onSideSelect,
  selectedAngle,
  selectedSide,
  disabled = false,
}) => {
  const getAngleButtonClass = (value: AngleType) => {
    const baseClass = 'w-full h-auto py-3 px-4 flex flex-col items-center gap-1 transition-all';
    if (selectedAngle === value) {
      return `${baseClass} bg-purple-600 text-white border-purple-600`;
    }
    return `${baseClass} border-purple-300 text-purple-700 hover:bg-purple-50`;
  };

  const getSideButtonClass = (value: SideType) => {
    const baseClass = 'w-full h-auto py-3 px-4 flex flex-col items-center gap-1 transition-all';
    if (selectedSide === value) {
      return `${baseClass} bg-cyan-600 text-white border-cyan-600`;
    }
    return `${baseClass} border-cyan-300 text-cyan-700 hover:bg-cyan-50`;
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* סיווג לפי זוויות */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-purple-600 flex items-center gap-2">
          <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
          לפי זוויות:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {angleOptions.map(option => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onAngleSelect(option.value)}
                disabled={disabled}
                variant={selectedAngle === option.value ? 'default' : 'outline'}
                className={getAngleButtonClass(option.value)}
              >
                <span className="font-bold text-base">{option.label}</span>
                <span className="text-xs opacity-75">{option.description}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* סיווג לפי צלעות */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-cyan-600 flex items-center gap-2">
          <span className="w-3 h-3 bg-cyan-600 rounded-full"></span>
          לפי צלעות:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sideOptions.map(option => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onSideSelect(option.value)}
                disabled={disabled}
                variant={selectedSide === option.value ? 'default' : 'outline'}
                className={getSideButtonClass(option.value)}
              >
                <span className="font-bold text-base">{option.label}</span>
                <span className="text-xs opacity-75">{option.description}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnswerButtons;
