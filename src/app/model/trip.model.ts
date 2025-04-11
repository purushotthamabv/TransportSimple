export interface Trip {
    start: string;
    end: string;
    level: number;
    type: 'continued' | 'diverted' | 'constant' | 'returned';
    display: string;
  }
