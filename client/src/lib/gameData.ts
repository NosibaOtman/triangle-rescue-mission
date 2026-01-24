// משימת הצלת המשולשים - נתוני השלבים ויצירת משולשים

import type { AngleType, SideType, Triangle, GameLevel, Difficulty } from '@/types/game';
import { classifyByAngles, classifyBySides } from './triangleClassifier';

/**
 * יצור משולש עם זוויות וצלעות מוגדרות
 */
function createTriangle(
  id: string,
  level: number,
  vertices: [[number, number], [number, number], [number, number]],
  angles: [number, number, number],
  sides: [number, number, number],
  rotation: number = 0,
  color: string = '#3B82F6'
): Triangle {
  const angleType = classifyByAngles(angles);
  const sideType = classifyBySides(sides);
  
  return {
    id,
    level,
    vertices: vertices.map(([x, y]) => ({ x, y })) as [any, any, any],
    angles,
    sides,
    angleType,
    sideType,
    rotation,
    color,
    highlightColor: '#1E40AF',
  };
}

/**
 * יצור רמות משחק
 */
export function generateGameLevels(): GameLevel[] {
  const levels: GameLevel[] = [];
  
  // שלב 1: משולש חד שווה צלעות (קל)
  levels.push({
    id: 'level_1',
    levelNumber: 1,
    triangle: createTriangle(
      'triangle_1',
      1,
      [[150, 50], [250, 200], [50, 200]],
      [60, 60, 60],
      [100, 100, 100],
      0,
      '#3B82F6'
    ),
    difficulty: 'easy',
    storyText: 'משולש ראשון תקוע! זה משולש בכיוון סטנדרטי. סווגו אותו לפי זוויות וצלעות.',
  });
  
  // שלב 2: משולש ישר שונה צלעות (קל)
  levels.push({
    id: 'level_2',
    levelNumber: 2,
    triangle: createTriangle(
      'triangle_2',
      2,
      [[100, 50], [250, 200], [100, 200]],
      [90, 45, 45],
      [100, 141, 100],
      0,
      '#06B6D4'
    ),
    difficulty: 'easy',
    storyText: 'משולש שני! זה משולש עם זווית ישרה. בואו נסווג אותו.',
  });
  
  // שלב 3: משולש קהה שווה שוקיים (קל)
  levels.push({
    id: 'level_3',
    levelNumber: 3,
    triangle: createTriangle(
      'triangle_3',
      3,
      [[150, 30], [250, 220], [50, 220]],
      [120, 30, 30],
      [150, 100, 100],
      0,
      '#8B5CF6'
    ),
    difficulty: 'easy',
    storyText: 'משולש שלישי! זה משולש עם זווית גדולה מ-90°. סווגו אותו.',
  });
  
  // שלב 4: משולש חד שווה שוקיים (בינוני) - מסובב
  levels.push({
    id: 'level_4',
    levelNumber: 4,
    triangle: createTriangle(
      'triangle_4',
      4,
      [[150, 50], [200, 180], [100, 180]],
      [70, 55, 55],
      [120, 100, 100],
      45,
      '#10B981'
    ),
    difficulty: 'medium',
    storyText: 'משולש רביעי! זה משולש מסובב. שימו לב לזוויות והצלעות.',
  });
  
  // שלב 5: משולש ישר שווה שוקיים (בינוני) - מסובב
  levels.push({
    id: 'level_5',
    levelNumber: 5,
    triangle: createTriangle(
      'triangle_5',
      5,
      [[150, 50], [220, 150], [80, 150]],
      [90, 45, 45],
      [100, 70, 70],
      30,
      '#F59E0B'
    ),
    difficulty: 'medium',
    storyText: 'משולש חמישי! זה משולש מסובב עם זווית ישרה. בואו נסווג אותו.',
  });
  
  // שלב 6: משולש קהה שונה צלעות (בינוני) - מסובב
  levels.push({
    id: 'level_6',
    levelNumber: 6,
    triangle: createTriangle(
      'triangle_6',
      6,
      [[150, 40], [240, 200], [50, 190]],
      [110, 40, 30],
      [150, 120, 80],
      60,
      '#EF4444'
    ),
    difficulty: 'medium',
    storyText: 'משולש שישי! זה משולש מורכב יותר. בדקו בעיון.',
  });
  
  // שלב 7: משולש חד שונה צלעות (קשה) - כיוון שונה לחלוטין
  levels.push({
    id: 'level_7',
    levelNumber: 7,
    triangle: createTriangle(
      'triangle_7',
      7,
      [[150, 100], [200, 50], [80, 180]],
      [75, 60, 45],
      [110, 100, 80],
      -30,
      '#3B82F6'
    ),
    difficulty: 'hard',
    storyText: 'משולש שביעי! זה משולש בכיוון לא סטנדרטי. צריך ניתוח זהיר.',
  });
  
  // שלב 8: משולש ישר שונה צלעות (קשה) - כיוון שונה
  levels.push({
    id: 'level_8',
    levelNumber: 8,
    triangle: createTriangle(
      'triangle_8',
      8,
      [[150, 80], [200, 180], [100, 180]],
      [90, 50, 40],
      [130, 100, 80],
      -60,
      '#06B6D4'
    ),
    difficulty: 'hard',
    storyText: 'משולש שמיני! זה משולש עם זווית ישרה בכיוון לא סטנדרטי.',
  });
  
  // שלב 9: משולש קהה שונה צלעות (קשה) - כיוון שונה
  levels.push({
    id: 'level_9',
    levelNumber: 9,
    triangle: createTriangle(
      'triangle_9',
      9,
      [[150, 60], [220, 170], [60, 150]],
      [100, 50, 30],
      [140, 110, 70],
      75,
      '#8B5CF6'
    ),
    difficulty: 'hard',
    storyText: 'משולש תשיעי! זה משולש קשה עם זווית קהה בכיוון מורכב.',
  });
  
  // שלב 10: משולש חד שווה צלעות (קשה) - כיוון שונה לחלוטין
  levels.push({
    id: 'level_10',
    levelNumber: 10,
    triangle: createTriangle(
      'triangle_10',
      10,
      [[150, 80], [200, 30], [100, 30]],
      [60, 60, 60],
      [100, 100, 100],
      -45,
      '#10B981'
    ),
    difficulty: 'hard',
    storyText: 'משולש עשירי - האחרון! זה משולש שווה צלעות בכיוון לא סטנדרטי. בואו נסיים את המשימה!',
  });
  
  return levels;
}

/**
 * קבל רמה לפי מספר
 */
export function getLevelByNumber(levelNumber: number): GameLevel | undefined {
  const levels = generateGameLevels();
  return levels.find(l => l.levelNumber === levelNumber);
}

/**
 * קבל כל הרמות
 */
export function getAllLevels(): GameLevel[] {
  return generateGameLevels();
}

/**
 * קבל סה"כ מספר רמות
 */
export function getTotalLevels(): number {
  return generateGameLevels().length;
}

/**
 * קבל רמה הבאה
 */
export function getNextLevel(currentLevelNumber: number): GameLevel | undefined {
  return getLevelByNumber(currentLevelNumber + 1);
}

/**
 * בדוק אם זה הרמה האחרונה
 */
export function isLastLevel(levelNumber: number): boolean {
  return levelNumber === getTotalLevels();
}
