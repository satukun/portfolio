export const getLevelColor = (level: number): string => {
  switch (level) {
    case 5: return '#10b981'; // green
    case 4: return '#3b82f6'; // blue
    case 3: return '#f59e0b'; // amber
    case 2: return '#ef4444'; // red
    default: return '#6b7280'; // gray
  }
};

export const getLevelText = (level: number): string => {
  switch (level) {
    case 5: return 'エキスパート';
    case 4: return '上級';
    case 3: return '中級';
    case 2: return '初級';
    default: return '学習中';
  }
};
