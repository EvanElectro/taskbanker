
// Define the structure of a task completion record
export interface TaskCompletion {
  date: string;
  completed: boolean;
  timestamp: string;
}

// Define the structure of a task
export interface Task {
  id: string;
  title: string;
  completions: TaskCompletion[];
  createdAt: string;
  scheduledTime?: string | null;
}

// Extend Task for daily tasks with ordering
export interface DailyTask extends Task {
  order: number;
}

// Define the possible sort options
export type SortOption = 'mostUsed' | 'recentlyUsed' | 'alphabetical';

// Define the possible view types, including new embedded view
export type ViewType = 'bank' | 'daily' | 'logbook' | 'embedded';

// Define the shape of our task context
export interface TaskContextType {
  tasks: Task[];
  dailyTasks: DailyTask[];
  activeView: ViewType;
  sortOption: SortOption;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  clearDefaultTasks: () => void;
  toggleTaskCompletion: (id: string) => void;
  generateDailyTasks: (count: number) => void;
  reorderDailyTask: (id: string, direction: 'up' | 'down') => void;
  scheduleTask: (id: string, time: string | null) => void;
  setSortOption: (option: SortOption) => void;
  setActiveView: (view: ViewType) => void;
}
