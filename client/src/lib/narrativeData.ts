// משימת הצלת המשולשים - נתוני סיפור והודעות נרטיביות

/**
 * הודעות נרטיביות לכל שלב של התקדמות הצלה
 */
export const RESCUE_NARRATIVES = [
  {
    level: 0,
    title: "🚨 משימה מתחילה",
    message: "קבוצה של גיאומטריסטים תקועה! עליך לסווג משולשים כדי להציל אותם.",
    emoji: "🚨",
  },
  {
    level: 1,
    title: "✓ צעד ראשון",
    message: "מעולה! הסרת את המחסום הראשון. הקבוצה מרגישה תקווה!",
    emoji: "✓",
  },
  {
    level: 2,
    title: "✓ התקדמות טובה",
    message: "שתי משימות הושלמו! אתה מתקרב להצלה.",
    emoji: "✓",
  },
  {
    level: 3,
    title: "✓ רבע הדרך",
    message: "שלוש משימות! הקבוצה שומעת את קולך - המשך!",
    emoji: "✓",
  },
  {
    level: 4,
    title: "✓ אמצע המשימה",
    message: "חצי הדרך! אתה קרוב מאוד להצלה. לא תוותר עכשיו!",
    emoji: "✓",
  },
  {
    level: 5,
    title: "✓ רוח חזקה",
    message: "חמש משימות הושלמו! הקבוצה כמעט מושגת.",
    emoji: "✓",
  },
  {
    level: 6,
    title: "✓ בעיצומה",
    message: "שש משימות! אתה כמעט שם. עוד קצת!",
    emoji: "✓",
  },
  {
    level: 7,
    title: "✓ קרוב מאוד",
    message: "שבע משימות! הקבוצה רואה אותך בעיניים!",
    emoji: "✓",
  },
  {
    level: 8,
    title: "✓ כמעט הצלה",
    message: "שמונה משימות! עוד שתיים בלבד!",
    emoji: "✓",
  },
  {
    level: 9,
    title: "✓ האחרונה",
    message: "תשע משימות! משימה אחת אחרונה בלבד!",
    emoji: "✓",
  },
  {
    level: 10,
    title: "🎉 הצלה מוצלחת!",
    message: "הצלחת! הקבוצה חופשית! אתה גיבור הגיאומטריה!",
    emoji: "🎉",
  },
];

/**
 * הודעות עידוד קצרות לתשובות נכונות
 */
export const CORRECT_ANSWER_ENCOURAGEMENTS = [
  "נכון! סיווג מושלם!",
  "כל הכבוד! הבנת את הקונספט!",
  "מעולה! תשובה נכונה!",
  "יפה! אתה על הדרך הנכונה!",
  "מושלם! המשך כך!",
  "נהדר! הבנה עמוקה!",
  "מדהים! סיווג מדויק!",
  "מעולה! אתה מומחה!",
];

/**
 * הודעות לתשובות שגויות (לא מתקדמות)
 */
export const INCORRECT_ANSWER_MESSAGES = [
  "בואו נבדוק את התשובה שלך...",
  "לא בדיוק. בואו נלמד מזה.",
  "טעות קטנה. בואו נתקן אותה.",
  "לא בדיוק. בואו נבין למה.",
];

/**
 * קבלת הודעה נרטיבית לפי מספר תשובות נכונות
 */
export function getNarrativeForLevel(correctAnswers: number) {
  return RESCUE_NARRATIVES[Math.min(correctAnswers, RESCUE_NARRATIVES.length - 1)];
}

/**
 * קבלת הודעת עידוד אקראית
 */
export function getRandomEncouragement(): string {
  return CORRECT_ANSWER_ENCOURAGEMENTS[
    Math.floor(Math.random() * CORRECT_ANSWER_ENCOURAGEMENTS.length)
  ];
}

/**
 * קבלת הודעת שגיאה אקראית
 */
export function getRandomIncorrectMessage(): string {
  return INCORRECT_ANSWER_MESSAGES[
    Math.floor(Math.random() * INCORRECT_ANSWER_MESSAGES.length)
  ];
}

/**
 * תיאור מצב ההצלה בהתאם לאחוז התקדמות
 */
export function getRescueStatusDescription(correctAnswers: number, totalLevels: number): string {
  const percentage = (correctAnswers / totalLevels) * 100;
  
  if (percentage === 0) return "הצלה לא התחילה עדיין";
  if (percentage < 25) return "הצלה בשלבי התחלה";
  if (percentage < 50) return "הצלה בתהליך";
  if (percentage < 75) return "הצלה בעיצומה";
  if (percentage < 100) return "הצלה קרובה מאוד";
  return "הצלה הושלמה בהצלחה!";
}
