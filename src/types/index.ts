
export interface Task {
  id: string;
  title: string;
  completions: CompletionRecord[];
  createdAt: string;
  scheduledTime?: string | null;
}

export interface CompletionRecord {
  date: string;
  completed: boolean;
  timestamp: string;
}

export interface DailyTask extends Task {
  order: number;
}

export type SortOption = 'mostUsed' | 'recentlyUsed' | 'alphabetical';

export interface TaskContextType {
  tasks: Task[];
  dailyTasks: DailyTask[];
  activeView: 'bank' | 'daily' | 'logbook';
  sortOption: SortOption;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  generateDailyTasks: (count: number) => void;
  reorderDailyTask: (id: string, direction: 'up' | 'down') => void;
  scheduleTask: (id: string, time: string | null) => void;
  setSortOption: (option: SortOption) => void;
  setActiveView: (view: 'bank' | 'daily' | 'logbook') => void;
}
