# משימת הצלת המשולשים: ארכיטקטורה טכנית מקיפה

## 1. סקירה כללית

**משימת הצלת המשולשים** היא אפליקציית React מבוסס-ווב המיישמת משחק חינוכי לסיווג משולשים. האפליקציה בנויה על ערימת טכנולוגיות מודרנית עם דגש על ביצועים, נגישות, ותרגול פדגוגי.

### 1.1 מטרות ארכיטקטוריות

- **מודולריות**: קומפוננטות ניתנות לשימוש חוזר ולוגיקה מופרדת
- **ביצועים**: רינדור מהיר, אנימציות חלקות, ללא עיכובים
- **נגישות**: תמיכה בקלט מקלדת, קריאות ברורה, סימון צבעוני
- **תחזוקה**: קוד נקי, טיפוסים TypeScript, הערות ברורות

---

## 2. ערימת טכנולוגיות

### 2.1 Frontend

| טכנולוגיה | גרסה | תפקיד |
|-----------|------|--------|
| **React** | 19.2.1 | ספריית UI וניהול מצב |
| **TypeScript** | 5.6.3 | שפה עם בטיחות סוגים |
| **Tailwind CSS** | 4.1.14 | עיצוב ותגובתיות |
| **Framer Motion** | 12.23.22 | אנימציות ומעברים |
| **Wouter** | 3.3.5 | ניתוב בתוך הדף |
| **Vite** | 7.1.7 | בנאי ופיתוח מהיר |

### 2.2 Build & Deployment

| כלי | גרסה | תפקיד |
|-----|------|--------|
| **pnpm** | 10.15.1 | מנהל חבילות |
| **esbuild** | 0.25.0 | בנאי JavaScript |
| **Express** | 4.21.2 | שרת ייצור |

---

## 3. מבנה קבצים

```
triangle-rescue-mission/
├── client/
│   ├── src/
│   │   ├── types/
│   │   │   └── game.ts                 # הגדרות סוגי נתונים TypeScript
│   │   ├── lib/
│   │   │   ├── triangleClassifier.ts   # לוגיקת סיווג משולשים
│   │   │   └── gameData.ts             # יצירת משולשים ונתוני שלבים
│   │   ├── components/
│   │   │   ├── ui/                     # קומפוננטות shadcn/ui
│   │   │   ├── TriangleVisualizer.tsx  # רינדור SVG של משולשים
│   │   │   ├── AnswerButtons.tsx       # כפתורי בחירת תשובות
│   │   │   ├── FeedbackPanel.tsx       # לוח משוב אדפטיבי
│   │   │   ├── ProgressBar.tsx         # סרגל התקדמות
│   │   │   └── ErrorBoundary.tsx       # תפיסת שגיאות
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx        # ניהול ערכת צבעים
│   │   ├── pages/
│   │   │   ├── Game.tsx                # עמוד המשחק הראשי
│   │   │   ├── Home.tsx                # עמוד בית (לא בשימוש)
│   │   │   └── NotFound.tsx            # עמוד 404
│   │   ├── App.tsx                     # קומפוננטה ראשית וניתוב
│   │   ├── main.tsx                    # נקודת כניסה
│   │   └── index.css                   # סגנון גלובלי ומשתנים CSS
│   ├── public/
│   │   ├── images/                     # תמונות סטטיות
│   │   └── index.html                  # תבנית HTML
│   └── package.json                    # תלויות וסקריפטים
├── server/
│   └── index.ts                        # שרת Express (ריק בגרסה זו)
├── shared/
│   └── const.ts                        # קבועים משותפים
└── PEDAGOGICAL_REPORT.md               # דוח פדגוגי
```

---

## 4. הגדרות סוגי נתונים (TypeScript)

### 4.1 סוגי בסיסיים

```typescript
// סוגי זוויות
type AngleType = 'acute' | 'right' | 'obtuse';

// סוגי צלעות
type SideType = 'scalene' | 'isosceles' | 'equilateral';

// סוג משוב
type FeedbackType = 'correct' | 'incorrect' | 'hint';

// מצב משחק
type GamePhase = 'intro' | 'playing' | 'feedback' | 'gameover';
```

### 4.2 ממשקי עיקריים

```typescript
// משולש
interface Triangle {
  id: string;
  vertices: [Point, Point, Point];
  angles: [number, number, number];
  sides: [number, number, number];
  angleType: AngleType;
  sideType: SideType;
}

// נקודה
interface Point {
  x: number;
  y: number;
}

// שלב במשחק
interface GameLevel {
  id: number;
  triangle: Triangle;
  storyText: string;
}

// מצב משחק
interface GameState {
  currentLevelIndex: number;
  selectedAngle?: AngleType;
  selectedSide?: SideType;
  correctAnswers: number;
  incorrectAttempts: number;
  startTime: number;
  endTime?: number;
}
```

---

## 5. קומפוננטות ותפקידיהן

### 5.1 TriangleVisualizer

**תפקיד**: רינדור משולש כ-SVG עם סימונים צבעוניים

**Props**:
```typescript
interface TriangleVisualizerProps {
  triangle: Triangle;
  highlightAngles?: boolean;
  highlightSides?: boolean;
  showLabels?: boolean;
}
```

**תכונות**:
- רינדור SVG דיוקי של משולש
- סימון זוויות בסגול (●)
- סימון צלעות בתכלת (━)
- תוויות מדויקות (זוויות בעברית, אורכי צלעות)
- אנימציה עדינה בעת טעינה

### 5.2 AnswerButtons

**תפקיד**: הצגת 6 כפתורי תשובה (3 לזוויות, 3 לצלעות)

**Props**:
```typescript
interface AnswerButtonsProps {
  onAngleSelect: (angle: AngleType) => void;
  onSideSelect: (side: SideType) => void;
  selectedAngle?: AngleType;
  selectedSide?: SideType;
  disabled?: boolean;
}
```

**תכונות**:
- כפתורים בצבעים שונים לכל קטגוריה
- הדגשה ויזואלית של בחירה
- טקסט ברור עם הסברים קצרים

### 5.3 FeedbackPanel

**תפקיד**: הצגת משוב אדפטיבי (נכון/שגוי)

**Props**:
```typescript
interface FeedbackPanelProps {
  type: FeedbackType;
  title: string;
  message: string;
  explanation?: string;
  onContinue: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
}
```

**תכונות**:
- צבעים שונים לפי סוג משוב (ירוק/אדום/צהוב)
- אנימציה כניסה
- הסברים מפורטים
- כפתורים "נסה שוב" ו"המשך"

### 5.4 ProgressBar

**תפקיד**: הצגת התקדמות דרך 10 שלבים

**Props**:
```typescript
interface ProgressBarProps {
  currentLevel: number;
  totalLevels: number;
}
```

**תכונות**:
- סרגל ליניארי עם אנימציה
- תרשים דלתות (10 דלתות)
- טקסט מספרי

### 5.5 Game

**תפקיד**: ניהול מצב המשחק וזרימת הלוגיקה

**State**:
```typescript
const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
const [levels, setLevels] = useState<GameLevel[]>([]);
const [selectedAngle, setSelectedAngle] = useState<AngleType | undefined>();
const [selectedSide, setSelectedSide] = useState<SideType | undefined>();
const [correctAnswers, setCorrectAnswers] = useState(0);
const [incorrectAttempts, setIncorrectAttempts] = useState(0);
```

**Handlers**:
- `handleSubmitAnswer()`: בדיקת תשובה וקביעת משוב
- `handleContinueToNextLevel()`: התקדמות לשלב הבא
- `handleRetry()`: נסיון שוב
- `handleRestartGame()`: התחלה מחדש

---

## 6. לוגיקת הליבה

### 6.1 triangleClassifier.ts

**פונקציות עיקריות**:

```typescript
// בדיקת תשובה
function isAnswerCorrect(
  triangle: Triangle,
  selectedAngle: AngleType,
  selectedSide: SideType
): boolean

// קבלת משוב על זוויות
function getAngleFeedback(
  triangle: Triangle,
  selectedAngle: AngleType
): string

// קבלת משוב על צלעות
function getSideFeedback(
  triangle: Triangle,
  selectedSide: SideType
): string

// המרה לעברית
function getAngleTypeHebrew(angle: AngleType): string
function getSideTypeHebrew(side: SideType): string
```

### 6.2 gameData.ts

**פונקציות עיקריות**:

```typescript
// יצירת משולשים אקראיים
function generateTriangle(difficulty: number): Triangle

// יצירת 10 שלבים
function generateGameLevels(): GameLevel[]

// קבלת סה"כ שלבים
function getTotalLevels(): number

// בדיקה אם זה השלב האחרון
function isLastLevel(levelIndex: number): boolean
```

---

## 7. זרימת נתונים

### 7.1 זרימה ליניארית

```
User Input (Button Click)
    ↓
Handler (handleSubmitAnswer)
    ↓
Classifier (isAnswerCorrect)
    ↓
State Update (setFeedbackType, setGamePhase)
    ↓
Component Re-render (FeedbackPanel)
    ↓
User Sees Feedback
```

### 7.2 ניהול מצב

```
Game.tsx (Parent)
├── State: gamePhase, currentLevelIndex, levels, ...
├── Handlers: handleSubmitAnswer, handleContinueToNextLevel, ...
└── Children:
    ├── ProgressBar (Props: currentLevel, totalLevels)
    ├── TriangleVisualizer (Props: triangle)
    ├── AnswerButtons (Props: selectedAngle, selectedSide, handlers)
    └── FeedbackPanel (Props: type, title, message, handlers)
```

---

## 8. עיצוב Tailwind CSS

### 8.1 ערכת צבעים

```css
:root {
  --primary: oklch(0.623 0.214 259.815);      /* כחול */
  --secondary: oklch(0.98 0.001 286.375);     /* אפור בהיר */
  --accent: oklch(0.967 0.001 286.375);       /* אפור */
  --destructive: oklch(0.577 0.245 27.325);   /* אדום */
  --background: oklch(1 0 0);                 /* לבן */
  --foreground: oklch(0.235 0.015 65);        /* שחור */
}
```

### 8.2 משתנים CSS

```css
--radius: 0.65rem;
--spacing: 1rem;
--shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

---

## 9. אנימציות Framer Motion

### 9.1 אנימציות עיקריות

| אנימציה | שימוש | משך |
|---------|--------|------|
| **Fade In** | מסכי חדשים | 0.3s |
| **Scale** | כפתורים | 0.2s |
| **Slide** | משוב שגוי | 0.3s |
| **Progress** | סרגל התקדמות | 0.5s |

### 9.2 דוגמה: Feedback Animation

```typescript
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
```

---

## 10. ביצועים

### 10.1 אופטימיזציות

- **Code Splitting**: Vite מחלק את הקוד לחבילות קטנות
- **Lazy Loading**: קומפוננטות מטענות עם `React.lazy()`
- **Memoization**: `useMemo()` ו-`useCallback()` למניעת re-renders מיותרים
- **SVG Optimization**: משולשים מחושבים בזיכרון, לא מטענים מקבצים

### 10.2 מדדי ביצועים

| מדד | ערך |
|-----|-----|
| **First Contentful Paint** | < 1s |
| **Time to Interactive** | < 2s |
| **Lighthouse Score** | > 90 |

---

## 11. נגישות (A11y)

### 11.1 תמיכה בקלט מקלדת

- Tab: ניווט בין כפתורים
- Enter: הפעלת כפתור
- Escape: חזרה לתפריט ראשי

### 11.2 קריאות ברורה

- **Contrast Ratio**: לפחות 4.5:1 בין טקסט לרקע
- **Font Size**: לפחות 14px לגוף טקסט
- **Line Height**: 1.5 לקריאות נוחה

### 11.3 סימון צבעוני

- **לא רק צבע**: סימונים כוללים טקסט וסמלים
- **Color Blind Safe**: צבעים שנבחרו להיות בטוחים לעיוורון צבעים

---

## 12. בדיקה ותיקוף

### 12.1 בדיקות ידניות

- ✓ בדיקת כל 10 שלבים
- ✓ בדיקת תשובות נכונות ושגויות
- ✓ בדיקת משוב אדפטיבי
- ✓ בדיקת סרגל התקדמות
- ✓ בדיקת אנימציות

### 12.2 בדיקות אוטומטיות (עתידיות)

```typescript
describe('Triangle Classifier', () => {
  it('should classify acute triangle correctly', () => {
    const triangle = { angles: [60, 60, 60], ... };
    expect(isAnswerCorrect(triangle, 'acute', 'equilateral')).toBe(true);
  });

  it('should provide correct feedback for wrong angle', () => {
    const triangle = { angles: [90, 45, 45], ... };
    const feedback = getAngleFeedback(triangle, 'acute');
    expect(feedback).toContain('90°');
  });
});
```

---

## 13. פריסה וייצור

### 13.1 Build Process

```bash
# פיתוח
pnpm dev

# בנייה
pnpm build

# תצוגה מקדימה
pnpm preview

# בדיקת TypeScript
pnpm check
```

### 13.2 Output

```
dist/
├── index.html           # תבנית HTML
├── assets/
│   ├── index.*.js       # JavaScript מורחב
│   └── index.*.css      # CSS מורחב
└── public/
    └── images/          # תמונות סטטיות
```

---

## 14. הרחבות עתידיות

### 14.1 תכונות טכניות

1. **Backend API**: שמירת ציונים בבסיס נתונים
2. **Authentication**: התחברות תלמידים
3. **Analytics**: מעקב אחר ביצועים
4. **Multiplayer**: משחק בין תלמידים

### 14.2 שיפורים ארכיטקטוניים

1. **State Management**: Redux או Zustand לניהול מצב מורכב יותר
2. **API Client**: tRPC או GraphQL לתקשורת עם שרת
3. **Testing**: Jest ו-React Testing Library
4. **CI/CD**: GitHub Actions לבדיקות אוטומטיות

---

## 15. מקורות ותיעוד

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev

---

**יצירה:** Manus AI  
**תאריך:** 24 בינואר 2026  
**גרסה:** 1.0
