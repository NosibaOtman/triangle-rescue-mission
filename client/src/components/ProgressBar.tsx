// משימת הצלת המשולשים - קומפוננטת סרגל התקדמות

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentLevel: number;
  totalLevels: number;
}

/**
 * קומפוננטה להצגת התקדמות
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentLevel,
  totalLevels,
}) => {
  const progress = (currentLevel / totalLevels) * 100;

  return (
    <div className="w-full space-y-3">
      {/* סרגל ליניארי */}
      <div className="flex items-center gap-3">
        <div className="flex-grow">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          {currentLevel}/{totalLevels}
        </span>
      </div>

      {/* תרשים דלתות */}
      <div className="flex gap-2 justify-between">
        {Array.from({ length: totalLevels }).map((_, index) => {
          const levelNumber = index + 1;
          const isCompleted = levelNumber < currentLevel;
          const isCurrent = levelNumber === currentLevel;

          return (
            <motion.div
              key={`door-${index}`}
              className={`flex-1 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all ${
                isCompleted
                  ? 'bg-green-500 border-green-600 text-white'
                  : isCurrent
                    ? 'bg-blue-500 border-blue-600 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-600'
              }`}
              initial={{ rotateY: 0 }}
              animate={isCompleted ? { rotateY: 90 } : { rotateY: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isCompleted ? '✓' : isCurrent ? '→' : levelNumber}
            </motion.div>
          );
        })}
      </div>

      {/* טקסט תיאור */}
      <p className="text-center text-sm text-gray-600">
        שלב {currentLevel} מתוך {totalLevels}
      </p>
    </div>
  );
};

export default ProgressBar;
