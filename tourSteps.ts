import { TourStep } from '../components/VirtualTour';

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'ברוכים הבאים למערכת ניתוח בתי ספר',
    description: 'המערכת תעזור לכם לנתח נתוני בתי ספר, לזהות אתגרים ולבנות תכניות התערבות מותאמות. בואו נתחיל את הסיור!',
    skipable: true
  },
  {
    id: 'upload-file',
    title: 'שלב 1: העלאת קובץ נתונים',
    description: 'התחילו בהעלאת קובץ Excel או CSV המכיל נתוני בתי הספר. הקובץ צריך לכלול עמודות עם ציונים ומדדים של כל בית ספר.',
    targetSelector: '[data-tour="file-upload"]',
    position: 'bottom'
  },
  {
    id: 'data-mapping',
    title: 'שלב 2: מיפוי נתונים',
    description: 'בשלב זה תוכלו להתאים את העמודות בקובץ למדדים הנכונים במערכת. המערכת תנסה לזהות אוטומטית את העמודות הנכונות.',
    targetSelector: '[data-tour="data-mapping"]',
    position: 'bottom'
  },
  {
    id: 'analysis-overview',
    title: 'שלב 3: סקירת הניתוח',
    description: 'כאן תוכלו לראות סקירה כללית של הנתונים - ממוצעים, התפלגות בתי הספר לפי רמות תפקוד, ותרשים חום אינטראקטיבי.',
    targetSelector: '[data-tour="analysis-overview"]',
    position: 'bottom'
  },
  {
    id: 'heat-map',
    title: 'תרשים החום האינטראקטיבי',
    description: 'תרשים החום מציג את הביצועים של בתי הספר בכל תחום. צבעים כהים יותר מציינים אתגרים גדולים יותר. לחצו על ריבועים לפרטים נוספים.',
    targetSelector: '[data-tour="heat-map"]',
    position: 'bottom'
  },
  {
    id: 'school-reports',
    title: 'דוחות בתי ספר מפורטים',
    description: 'בחרו בית ספר מהרשימה כדי לראות דוח מפורט עם כל המדדים, אתגרים ספציפיים והמלצות לשיפור.',
    targetSelector: '[data-tour="school-reports"]',
    position: 'bottom'
  },
  {
    id: 'focus-areas',
    title: 'שלב 4: בחירת תחומי התמקדות',
    description: 'בחרו עד 3 תחומי התמקדות שרלוונטיים לפיקוח שלכם. הבחירה תכוון את המערכת לזהות סוגיות ספציפיות בתחומים אלה.',
    targetSelector: '[data-tour="focus-areas"]',
    position: 'bottom'
  },
  {
    id: 'issue-selection',
    title: 'שלב 5: בחירת סוגיות להתערבות',
    description: 'המערכת זיהתה סוגיות רלוונטיות לתחומי ההתמקדות שבחרתם. בחרו עד 3 סוגיות לבניית תכנית התערבות ממוקדת.',
    targetSelector: '[data-tour="issue-selection"]',
    position: 'bottom'
  },
  {
    id: 'issue-details',
    title: 'פירוט אתגרי בתי הספר',
    description: 'לחצו על "הצג פירוט בתי ספר" כדי לראות אילו בתי ספר מתמודדים עם כל סוגיה, ומה האתגרים הספציפיים שלהם.',
    targetSelector: '[data-tour="issue-details"]',
    position: 'bottom'
  },
  {
    id: 'mtss-tiering',
    title: 'שלב 6: סיווג בתי ספר לפי MTSS',
    description: 'בשלב זה תוכלו לסווג את בתי הספר לפי רמות התמיכה הנדרשות: אוניברסלית (Tier 1), ממוקדת (Tier 2), או אינטנסיבית (Tier 3).',
    targetSelector: '[data-tour="mtss-tiering"]',
    position: 'bottom'
  },
  {
    id: 'supervisor-goals',
    title: 'שלב 7: יעדי המפקח',
    description: 'הגדירו יעדים ברורים ומדידים עבור כל סוגיה שנבחרה. היעדים יסייעו לכם לעקוב אחר ההתקדמות ולהעריך את האפקטיביות.',
    targetSelector: '[data-tour="supervisor-goals"]',
    position: 'bottom'
  },
  {
    id: 'intervention-plans',
    title: 'שלב 8: בניית תכניות התערבות',
    description: 'כאן תוכלו לבנות תכניות התערבות מפורטות לכל סוגיה, כולל פעולות ספציפיות, לוחות זמנים, ומדדי הצלחה.',
    targetSelector: '[data-tour="intervention-plans"]',
    position: 'bottom'
  },
  {
    id: 'plan-details',
    title: 'פירוט תכנית ההתערבות',
    description: 'בחרו סוגיה כדי לראות תכנית התערבות מפורטת עם שלושה רמות תמיכה: אוניברסלית, ממוקדת ואינטנסיבית.',
    targetSelector: '[data-tour="plan-details"]',
    position: 'bottom'
  },
  {
    id: 'printable-booklet',
    title: 'כרטיסי ידע מקצועי',
    description: 'לחצו על "הצג כרטיסי ידע" כדי לראות כרטיסי ידע מקצועי עם פרקטיקות מוכחות, תמיכת מפקח ומשאבים זמינים.',
    targetSelector: '[data-tour="printable-booklet"]',
    position: 'bottom'
  },
  {
    id: 'export-options',
    title: 'אפשרויות ייצוא',
    description: 'תוכלו לייצא את התכניות והדוחות בפורמטים שונים: PDF להדפסה, או CSV לניתוח נוסף.',
    targetSelector: '[data-tour="export-options"]',
    position: 'bottom'
  },
  {
    id: 'completion',
    title: 'סיום הסיור',
    description: 'מעולה! עכשיו אתם מוכנים להשתמש במערכת. תוכלו להתחיל בהעלאת קובץ נתונים או לחזור לסיור בכל עת.',
    skipable: true
  }
];

export const getTourStepsForStep = (currentStep: string): TourStep[] => {
  const stepMapping: { [key: string]: string[] } = {
    'upload': ['welcome', 'upload-file'],
    'data-mapping': ['data-mapping'],
    'analysis': ['analysis-overview', 'heat-map', 'school-reports'],
    'focus-area-selection': ['focus-areas'],
    'issue-selection': ['issue-selection', 'issue-details'],
    'mtss-tiering': ['mtss-tiering'],
    'supervisor-goals': ['supervisor-goals'],
    'plan': ['intervention-plans', 'plan-details', 'printable-booklet', 'export-options']
  };

  const relevantStepIds = stepMapping[currentStep] || [];
  return TOUR_STEPS.filter(step => relevantStepIds.includes(step.id));
};
