// משימת הצלת המשולשים - אינדיקטור התקדמות הצלה

import React from 'react';
import { motion } from 'framer-motion';
import { getNarrativeForLevel, getRescueStatusDescription } from '@/lib/narrativeData';

interface RescueProgressIndicatorProps {
  correctAnswers: number;
  totalLevels: number;
  isCompleted?: boolean;
}

/**
 * קומפוננטה להצגת התקדמות הצלה סיפורית
 * מציגה סרגל התקדמות, הודעה נרטיבית, ותיאור מצב
 */
export const RescueProgressIndicator: React.FC<RescueProgressIndicatorProps> = ({
  correctAnswers,
  totalLevels,
  isCompleted = false,
}) => {
  const progressPercentage = (correctAnswers / totalLevels) * 100;
  const narrative = getNarrativeForLevel(correctAnswers);
  const statusDescription = getRescueStatusDescription(correctAnswers, totalLevels);

  return (
    <motion.div
      className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6 space-y-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* כותרת סיפורית */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">{narrative.emoji}</span>
        <div>
          <h3 className="text-lg font-bold text-blue-900">{narrative.title}</h3>
          <p className="text-sm text-blue-700">{narrative.message}</p>
        </div>
      </div>

      {/* סרגל התקדמות */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-blue-800">התקדמות הצלה</span>
          <span className="text-sm font-bold text-blue-900">
            {correctAnswers}/{totalLevels} ({Math.round(progressPercentage)}%)
          </span>
        </div>

        {/* סרגל ליניארי */}
        <div className="w-full bg-blue-100 rounded-full h-4 overflow-hidden border border-blue-300">
          <motion.div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted
                ? 'bg-gradient-to-r from-green-400 to-green-600'
                : 'bg-gradient-to-r from-blue-400 to-blue-600'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* תיאור מצב */}
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isCompleted ? 'bg-green-500' : 'bg-blue-500'
          }`}
        />
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{statusDescription}</span>
        </p>
      </div>

      {/* מרחק נותר */}
      <div className="bg-white rounded-lg p-3 border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">משימות נותרות:</span>
          <span className="text-lg font-bold text-blue-600">
            {totalLevels - correctAnswers}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          {totalLevels - correctAnswers === 0
            ? '✓ כל המשימות הושלמו!'
            : `עוד ${totalLevels - correctAnswers} משימות עד להצלה מלאה`}
        </div>
      </div>

      {/* תרשים מילוי דלתות */}
      <div className="flex gap-1 justify-between">
        {Array.from({ length: totalLevels }).map((_, index) => {
          const isCompleted = index < correctAnswers;
          const isCurrent = index === correctAnswers;

          return (
            <motion.div
              key={`rescue-door-${index}`}
              className={`flex-1 h-8 rounded border-2 flex items-center justify-center text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-green-400 border-green-600 text-white'
                  : isCurrent
                    ? 'bg-blue-400 border-blue-600 text-white'
                    : 'bg-gray-200 border-gray-400 text-gray-600'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {isCompleted ? '✓' : isCurrent ? '→' : index + 1}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RescueProgressIndicator;
