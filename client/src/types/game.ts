// משימת הצלת המשולשים - הגדרות סוגי נתונים

export type AngleType = 'acute' | 'right' | 'obtuse';
export type SideType = 'scalene' | 'isosceles' | 'equilateral';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type FeedbackType = 'correct' | 'incorrect' | 'hint';

export interface Point {
  x: number;
  y: number;
}

export interface Triangle {
  id: string;
  level: number;
  
  // גיאומטריה
  vertices: [Point, Point, Point];
  angles: [number, number, number]; // בדרגות
  sides: [number, number, number]; // אורכים יחסיים
  
  // סיווג
  angleType: AngleType;
  sideType: SideType;
  
  // עיצוב
  rotation: number; // זווית סיבוב בדרגות
  color: string; // צבע בסיס
  highlightColor: string; // צבע הדגשה
}

export interface GameLevel {
  id: string;
  levelNumber: number;
  triangle: Triangle;
  difficulty: Difficulty;
  storyText: string;
  hint?: string;
}

export interface PlayerAnswer {
  angleType?: AngleType;
  sideType?: SideType;
  isCorrect: boolean;
  feedback?: string;
}

export interface GameState {
  currentLevelIndex: number;
  totalLevels: number;
  score: number;
  correctAnswers: number;
  incorrectAttempts: number;
  
  // מעקב אחרי ניסיונות בשלב הנוכחי
  currentAttempts: PlayerAnswer[];
  
  // הישגים
  achievements: string[];
  
  // זמן
  startTime: number;
  endTime?: number;
}

export interface FeedbackMessage {
  type: FeedbackType;
  title: string;
  message: string;
  explanation?: string;
  highlightAngle?: boolean;
  highlightSide?: boolean;
}

export interface GameConfig {
  totalLevels: number;
  difficultyProgression: {
    easy: number[]; // רמות קלות
    medium: number[]; // רמות בינוניות
    hard: number[]; // רמות קשות
  };
}
