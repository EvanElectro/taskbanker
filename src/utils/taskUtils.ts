
import { Task, SortOption } from '../types';

export const sortTasks = (tasks: Task[], sortOption: SortOption): Task[] => {
  const today = new Date().toISOString().split('T')[0];

  switch (sortOption) {
    case 'mostUsed':
      return [...tasks].sort((a, b) => 
        b.completions.length - a.completions.length
      );
      
    case 'recentlyUsed':
      return [...tasks].sort((a, b) => {
        const aLatestCompletion = a.completions
          .filter(c => c.completed)
          .sort((x, y) => 
            new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime()
          )[0];
          
        const bLatestCompletion = b.completions
          .filter(c => c.completed)
          .sort((x, y) => 
            new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime()
          )[0];
          
        if (!aLatestCompletion && !bLatestCompletion) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (!aLatestCompletion) return 1;
        if (!bLatestCompletion) return -1;
        
        return new Date(bLatestCompletion.timestamp).getTime() - 
               new Date(aLatestCompletion.timestamp).getTime();
      });
      
    case 'alphabetical':
      return [...tasks].sort((a, b) => 
        a.title.localeCompare(b.title)
      );
      
    default:
      return tasks;
  }
};

export const isTaskCompletedToday = (task: Task): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return task.completions.some(c => c.date === today && c.completed);
};

export const getCompletionCountForTask = (task: Task): number => {
  return task.completions.filter(c => c.completed).length;
};

export const formatTime = (timeString: string | null | undefined): string => {
  if (!timeString) return '';
  
  try {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    
    if (isNaN(hour) || isNaN(minute)) return '';
    
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, '0');
    
    return `${displayHour}:${displayMinute} ${period}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

export const generateDefaultTasks = (): Task[] => {
  const now = new Date().toISOString();
  const defaultTasks: Task[] = [
    {
      id: '1',
      title: 'Exercise for 30 minutes',
      completions: [],
      createdAt: now,
    },
    {
      id: '2',
      title: 'Read a book chapter',
      completions: [],
      createdAt: now,
    },
    {
      id: '3',
      title: 'Meditate for 10 minutes',
      completions: [],
      createdAt: now,
    },
    {
      id: '4',
      title: 'Write in journal',
      completions: [],
      createdAt: now,
    },
    {
      id: '5',
      title: 'Learn something new',
      completions: [],
      createdAt: now,
    },
    {
      id: '6',
      title: 'Drink 8 glasses of water',
      completions: [],
      createdAt: now,
    },
    {
      id: '7',
      title: 'Take a walk outside',
      completions: [],
      createdAt: now,
    },
    {
      id: '8',
      title: 'Practice gratitude',
      completions: [],
      createdAt: now,
    }
  ];
  
  return defaultTasks;
};
