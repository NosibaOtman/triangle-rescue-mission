// משימת הצלת המשולשים - עמוד המשחק הראשי עם התקדמות סיפורית

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TriangleVisualizer from '@/components/TriangleVisualizer';
import AnswerButtons from '@/components/AnswerButtons';
import FeedbackPanel from '@/components/FeedbackPanel';
import ProgressBar from '@/components/ProgressBar';
import RescueProgressIndicator from '@/components/RescueProgressIndicator';
import NarrativeMessage from '@/components/NarrativeMessage';
import { Button } from '@/components/ui/button';
import type { AngleType, SideType, GameState, GameLevel } from '@/types/game';
import {
  isAnswerCorrect,
  getAngleFeedback,
  getSideFeedback,
  getAngleTypeHebrew,
  getSideTypeHebrew,
} from '@/lib/triangleClassifier';
import {
  generateGameLevels,
  getTotalLevels,
  isLastLevel,
} from '@/lib/gameData';
import {
  getRandomEncouragement,
  getRandomIncorrectMessage,
} from '@/lib/narrativeData';

type GamePhase = 'intro' | 'playing' | 'feedback' | 'gameover';

/**
 * עמוד המשחק הראשי עם מערכת התקדמות סיפורית
 */
export default function Game() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [levels, setLevels] = useState<GameLevel[]>([]);
  const [selectedAngle, setSelectedAngle] = useState<AngleType | undefined>();
  const [selectedSide, setSelectedSide] = useState<SideType | undefined>();
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | 'hint'>('correct');
  const [feedbackTitle, setFeedbackTitle] = useState<string>('');
  const [feedbackExplanation, setFeedbackExplanation] = useState<string>('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number | undefined>();
  const [narrativeMessage, setNarrativeMessage] = useState<string>('');
  const [showNarrativeMessage, setShowNarrativeMessage] = useState(false);
  const [narrativeMessageType, setNarrativeMessageType] = useState<'success' | 'progress' | 'completion'>('progress');

  // אתחול רמות
  useEffect(() => {
    setLevels(generateGameLevels());
    setStartTime(Date.now());
  }, []);

  const currentLevel = levels[currentLevelIndex];
  const totalLevels = getTotalLevels();

  // הצגת הודעה נרטיבית לזמן קצוב
  const showNarrative = (message: string, type: 'success' | 'progress' | 'completion' = 'progress') => {
    setNarrativeMessage(message);
    setNarrativeMessageType(type);
    setShowNarrativeMessage(true);
    
    // הסתרת ההודעה אחרי 3 שניות
    setTimeout(() => {
      setShowNarrativeMessage(false);
    }, 3000);
  };

  // טיפול בבחירת תשובה
  const handleSubmitAnswer = () => {
    if (!selectedAngle || !selectedSide || !currentLevel) {
      return;
    }

    const correct = isAnswerCorrect(
      currentLevel.triangle,
      selectedAngle,
      selectedSide
    );

    if (correct) {
      // תשובה נכונה - התקדמות בהצלה
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      
      // הצגת הודעה נרטיבית
      const encouragement = getRandomEncouragement();
      showNarrative(encouragement, 'success');
      
      // הצגת משוב חיובי
      setFeedbackType('correct');
      setFeedbackTitle('✓ כל הכבוד!');
      setFeedbackMessage(
        `משולש זה הוא ${getAngleTypeHebrew(selectedAngle)} ו-${getSideTypeHebrew(selectedSide)}.`
      );
      setFeedbackExplanation(
        'סיווג נכון! אתה מוכן להמשיך לשלב הבא.'
      );
      setGamePhase('feedback');
    } else {
      // תשובה שגויה - אין התקדמות בהצלה
      setIncorrectAttempts(incorrectAttempts + 1);
      
      // הצגת הודעה שגיאה
      const incorrectMessage = getRandomIncorrectMessage();
      showNarrative(incorrectMessage, 'progress');
      
      setFeedbackType('incorrect');
      setFeedbackTitle('✗ לא בדיוק...');
      
      let explanation = '';
      if (selectedAngle !== currentLevel.triangle.angleType) {
        explanation += getAngleFeedback(currentLevel.triangle, selectedAngle);
      }
      if (selectedSide !== currentLevel.triangle.sideType) {
        if (explanation) explanation += '\n\n';
        explanation += getSideFeedback(currentLevel.triangle, selectedSide);
      }
      
      setFeedbackMessage('בואו נבדוק את התשובה שלך:');
      setFeedbackExplanation(explanation);
      setGamePhase('feedback');
    }
  };

  // טיפול בהמשך לשלב הבא
  const handleContinueToNextLevel = () => {
    if (isLastLevel(currentLevelIndex + 1)) {
      // משחק הסתיים
      setEndTime(Date.now());
      setGamePhase('gameover');
    } else {
      // עבור לשלב הבא
      setCurrentLevelIndex(currentLevelIndex + 1);
      setSelectedAngle(undefined);
      setSelectedSide(undefined);
      setGamePhase('playing');
    }
  };

  // טיפול בנסיון שוב
  const handleRetry = () => {
    setSelectedAngle(undefined);
    setSelectedSide(undefined);
    setGamePhase('playing');
  };

  // טיפול בהתחלת משחק
  const handleStartGame = () => {
    setGamePhase('playing');
  };

  // טיפול בהתחלה מחדש
  const handleRestartGame = () => {
    setCurrentLevelIndex(0);
    setSelectedAngle(undefined);
    setSelectedSide(undefined);
    setCorrectAnswers(0);
    setIncorrectAttempts(0);
    setStartTime(Date.now());
    setEndTime(undefined);
    setGamePhase('intro');
  };

  // חישוב זמן וסטטיסטיקות
  const totalTime = endTime ? Math.floor((endTime - startTime) / 1000) : 0;
  const successRate = totalLevels > 0 ? Math.round((correctAnswers / totalLevels) * 100) : 0;
  const isGameCompleted = correctAnswers === totalLevels;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
            🎯 משימת הצלת המשולשים
          </h1>
          <p className="text-lg text-blue-700">משחק לימודי בגיאומטריה</p>
        </div>

        <AnimatePresence mode="wait">
          {/* מסך פתיחה */}
          {gamePhase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-blue-900">ברוכים הבאים!</h2>
                <p className="text-lg text-gray-700">
                  אתם מומחי גיאומטריה שנשלחו למשימה חשובה:
                </p>
                <p className="text-xl font-semibold text-blue-700">
                  להציל משולשים תקועים על ידי סיווגם בצורה נכונה!
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 space-y-3 text-left">
                <h3 className="font-bold text-lg text-blue-900">המשימה שלכם:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ סווגו כל משולש לפי <span className="font-semibold">זוויות</span> (חד, ישר, קהה)</li>
                  <li>✓ סווגו כל משולש לפי <span className="font-semibold">צלעות</span> (שונה, שווה שוקיים, שווה צלעות)</li>
                  <li>✓ קבלו משוב מיידי וחינוכי</li>
                  <li>✓ התקדמו דרך {totalLevels} שלבים</li>
                  <li>✓ עקבו אחר התקדמות הצלת המשימה</li>
                </ul>
              </div>

              <Button
                onClick={handleStartGame}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-6 px-8 rounded-lg"
              >
                התחל משימה →
              </Button>
            </motion.div>
          )}

          {/* מסך משחק */}
          {gamePhase === 'playing' && currentLevel && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* אינדיקטור התקדמות הצלה */}
              <RescueProgressIndicator
                correctAnswers={correctAnswers}
                totalLevels={totalLevels}
                isCompleted={isGameCompleted}
              />

              {/* הודעה נרטיבית */}
              <NarrativeMessage
                message={narrativeMessage}
                type={narrativeMessageType}
                isVisible={showNarrativeMessage}
              />

              {/* סרגל התקדמות הקלאסי */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <ProgressBar
                  currentLevel={currentLevelIndex + 1}
                  totalLevels={totalLevels}
                />
              </div>

              {/* תוכן השלב */}
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                {/* טקסט נרטיבי */}
                <div className="text-center">
                  <p className="text-xl text-gray-700 font-semibold">
                    {currentLevel.storyText}
                  </p>
                </div>

                {/* משולש */}
                <div className="flex justify-center">
                  <TriangleVisualizer
                    triangle={currentLevel.triangle}
                    highlightAngles={true}
                    highlightSides={true}
                    showLabels={true}
                  />
                </div>

                {/* כפתורי תשובות */}
                <AnswerButtons
                  onAngleSelect={setSelectedAngle}
                  onSideSelect={setSelectedSide}
                  selectedAngle={selectedAngle}
                  selectedSide={selectedSide}
                  disabled={false}
                />

                {/* כפתור שליחה */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAngle || !selectedSide}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold text-lg py-4 px-12 rounded-lg"
                  >
                    שלח תשובה
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* מסך משוב */}
          {gamePhase === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg p-8 space-y-6"
            >
              <FeedbackPanel
                type={feedbackType}
                title={feedbackTitle}
                message={feedbackMessage}
                explanation={feedbackExplanation}
                onContinue={handleContinueToNextLevel}
                onRetry={feedbackType === 'incorrect' ? handleRetry : undefined}
                showRetry={feedbackType === 'incorrect'}
              />
            </motion.div>
          )}

          {/* מסך סיום */}
          {gamePhase === 'gameover' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center space-y-6"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-green-600">משימה הושלמה!</h2>

              {/* אינדיקטור הצלה סופי */}
              <RescueProgressIndicator
                correctAnswers={correctAnswers}
                totalLevels={totalLevels}
                isCompleted={true}
              />

              <div className="bg-green-50 rounded-lg p-6 space-y-4">
                <h3 className="text-2xl font-bold text-green-900">סטטיסטיקות:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-600 text-sm">תשובות נכונות</p>
                    <p className="text-3xl font-bold text-green-600">
                      {correctAnswers}/{totalLevels}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-600 text-sm">שיעור הצלחה</p>
                    <p className="text-3xl font-bold text-blue-600">{successRate}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-600 text-sm">זמן כולל</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-600 text-sm">ניסיונות שגויים</p>
                    <p className="text-3xl font-bold text-orange-600">{incorrectAttempts}</p>
                  </div>
                </div>
              </div>

              {successRate === 100 && (
                <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
                  <p className="text-lg font-bold text-yellow-800">
                    🏆 מומחה משולשים! תשובות 100% נכונות!
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center pt-4">
                <Button
                  onClick={handleRestartGame}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-8 rounded-lg"
                >
                  שחק שוב
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
