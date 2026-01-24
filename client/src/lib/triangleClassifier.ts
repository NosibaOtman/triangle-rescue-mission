// משימת הצלת המשולשים - לוגיקת סיווג משולשים

import type { AngleType, SideType, Triangle } from '@/types/game';

const EPSILON = 0.001; // סובלנות לשגיאות עיגול

/**
 * סיווג משולש לפי זוויות
 * @param angles - מערך של 3 זוויות בדרגות
 * @returns סוג הזוויות: 'acute', 'right', 'obtuse'
 */
export function classifyByAngles(angles: [number, number, number]): AngleType {
  const maxAngle = Math.max(...angles);
  
  // בדוק אם זווית ישרה (90 דרגות)
  if (Math.abs(maxAngle - 90) < EPSILON) {
    return 'right';
  }
  
  // בדוק אם זווית קהה (> 90 דרגות)
  if (maxAngle > 90 + EPSILON) {
    return 'obtuse';
  }
  
  // אחרת זה משולש חד (כל הזוויות < 90 דרגות)
  return 'acute';
}

/**
 * סיווג משולש לפי צלעות
 * @param sides - מערך של 3 אורכי צלעות
 * @returns סוג הצלעות: 'scalene', 'isosceles', 'equilateral'
 */
export function classifyBySides(sides: [number, number, number]): SideType {
  // מיין את הצלעות
  const sorted = sides.slice().sort((a, b) => a - b);
  const [a, b, c] = sorted;
  
  // בדוק אם שווה צלעות (כל הצלעות שוות)
  if (
    Math.abs(a - b) < EPSILON &&
    Math.abs(b - c) < EPSILON
  ) {
    return 'equilateral';
  }
  
  // בדוק אם שווה שוקיים (שתי צלעות שוות)
  if (
    Math.abs(a - b) < EPSILON ||
    Math.abs(b - c) < EPSILON ||
    Math.abs(a - c) < EPSILON
  ) {
    return 'isosceles';
  }
  
  // אחרת זה שונה צלעות
  return 'scalene';
}

/**
 * סיווג משולש מלא
 * @param triangle - אובייקט משולש
 * @returns אובייקט עם סיווג מלא
 */
export function classifyTriangle(triangle: Triangle) {
  return {
    angleType: classifyByAngles(triangle.angles),
    sideType: classifyBySides(triangle.sides),
  };
}

/**
 * בדוק אם תשובה נכונה
 * @param triangle - אובייקט משולש
 * @param userAngleType - בחירת המשתמש לסוג זוויות
 * @param userSideType - בחירת המשתמש לסוג צלעות
 * @returns true אם שתי התשובות נכונות
 */
export function isAnswerCorrect(
  triangle: Triangle,
  userAngleType: AngleType | undefined,
  userSideType: SideType | undefined
): boolean {
  if (!userAngleType || !userSideType) {
    return false;
  }
  
  return (
    userAngleType === triangle.angleType &&
    userSideType === triangle.sideType
  );
}

/**
 * בדוק אם תשובה חלקית נכונה (רק זוויות או רק צלעות)
 * @param triangle - אובייקט משולש
 * @param userAngleType - בחירת המשתמש לסוג זוויות
 * @param userSideType - בחירת המשתמש לסוג צלעות
 * @returns אובייקט עם בדיקות חלקיות
 */
export function checkPartialAnswer(
  triangle: Triangle,
  userAngleType: AngleType | undefined,
  userSideType: SideType | undefined
) {
  return {
    angleCorrect: userAngleType === triangle.angleType,
    sideCorrect: userSideType === triangle.sideType,
  };
}

/**
 * קבל הסבר לטעות בסיווג זוויות
 * @param triangle - אובייקט משולש
 * @param userChoice - בחירת המשתמש
 * @returns הסבר טקסטואלי
 */
export function getAngleFeedback(
  triangle: Triangle,
  userChoice: AngleType
): string {
  const correct = triangle.angleType;
  const maxAngle = Math.max(...triangle.angles);
  
  if (userChoice === correct) {
    return `✓ נכון! זה משולש ${getAngleTypeHebrew(correct)}.`;
  }
  
  if (correct === 'right') {
    return `לא בדיוק. בחרת "${getAngleTypeHebrew(userChoice)}", אבל משולש זה הוא ${getAngleTypeHebrew(correct)}. אחת הזוויות בדיוק 90°.`;
  }
  
  if (correct === 'obtuse') {
    return `לא בדיוק. בחרת "${getAngleTypeHebrew(userChoice)}", אבל משולש זה הוא ${getAngleTypeHebrew(correct)}. אחת הזוויות גדולה מ-90° (${Math.round(maxAngle)}°).`;
  }
  
  if (correct === 'acute') {
    return `לא בדיוק. בחרת "${getAngleTypeHebrew(userChoice)}", אבל משולש זה הוא ${getAngleTypeHebrew(correct)}. כל הזוויות קטנות מ-90°.`;
  }
  
  return 'טעות בסיווג הזוויות.';
}

/**
 * קבל הסבר לטעות בסיווג צלעות
 * @param triangle - אובייקט משולש
 * @param userChoice - בחירת המשתמש
 * @returns הסבר טקסטואלי
 */
export function getSideFeedback(
  triangle: Triangle,
  userChoice: SideType
): string {
  const correct = triangle.sideType;
  const sides = triangle.sides.map(s => Math.round(s * 10) / 10);
  
  if (userChoice === correct) {
    return `✓ נכון! זה משולש ${getSideTypeHebrew(correct)}.`;
  }
  
  if (correct === 'equilateral') {
    return `לא בדיוק. בחרת "${getSideTypeHebrew(userChoice)}", אבל משולש זה הוא ${getSideTypeHebrew(correct)}. כל שלוש הצלעות שוות (${sides[0]}).`;
  }
  
  if (correct === 'isosceles') {
    return `לא בדיוק. בחרת "${getSideTypeHebrew(userChoice)}", אבל משולש זה הוא ${getSideTypeHebrew(correct)}. שתי צלעות שוות באורך.`;
  }
  
  if (correct === 'scalene') {
    return `לא בדיוק. בחרת "${getSideTypeHebrew(userChoice)}", אבל משולש זה הוא ${getSideTypeHebrew(correct)}. כל שלוש הצלעות שונות באורך.`;
  }
  
  return 'טעות בסיווג הצלעות.';
}

/**
 * תרגם סוג זוויות לעברית
 */
export function getAngleTypeHebrew(type: AngleType): string {
  const map: Record<AngleType, string> = {
    acute: 'חד (Acute)',
    right: 'ישר (Right)',
    obtuse: 'קהה (Obtuse)',
  };
  return map[type];
}

/**
 * תרגם סוג צלעות לעברית
 */
export function getSideTypeHebrew(type: SideType): string {
  const map: Record<SideType, string> = {
    scalene: 'שונה צלעות (Scalene)',
    isosceles: 'שווה שוקיים (Isosceles)',
    equilateral: 'שווה צלעות (Equilateral)',
  };
  return map[type];
}
