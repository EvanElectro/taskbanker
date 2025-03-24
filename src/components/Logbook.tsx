
import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import EmptyState from './EmptyState';

const Logbook: React.FC = () => {
  const { tasks } = useTaskContext();
  
  // Get all completed tasks with their completion records
  const completedTasks = tasks
    .filter(task => task.completions.some(c => c.completed))
    .map(task => {
      return {
        ...task,
        completions: task.completions.filter(c => c.completed)
      };
    });
    
  // Group completions by date
  const completionsByDate: Record<string, {
    taskId: string;
    taskTitle: string;
    timestamp: string;
  }[]> = {};
  
  completedTasks.forEach(task => {
    task.completions.forEach(completion => {
      if (!completionsByDate[completion.date]) {
        completionsByDate[completion.date] = [];
      }
      
      completionsByDate[completion.date].push({
        taskId: task.id,
        taskTitle: task.title,
        timestamp: completion.timestamp
      });
    });
  });
  
  // Sort dates in descending order
  const sortedDates = Object.keys(completionsByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Logbook</h2>
      
      {sortedDates.length === 0 ? (
        <EmptyState
          title="Your logbook is empty"
          description="Complete tasks to see them here"
          icon={<BookOpen size={48} />}
        />
      ) : (
        <div className="space-y-8">
          {sortedDates.map(date => {
            const dateCompletions = completionsByDate[date];
            // Sort completions by timestamp in descending order
            dateCompletions.sort((a, b) => 
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            
            const formattedDate = format(new Date(date), 'EEEE, MMMM d, yyyy');
            
            return (
              <div key={date} className="animate-slide-up">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {formattedDate}
                </h3>
                
                <ul className="space-y-2 border-l-2 border-border pl-4">
                  {dateCompletions.map((completion, index) => {
                    const completionTime = format(new Date(completion.timestamp), 'h:mm a');
                    
                    return (
                      <li
                        key={`${completion.taskId}-${index}`}
                        className="relative pb-2"
                      >
                        <div className="absolute -left-[25px] top-0 bg-primary rounded-full p-1">
                          <CheckCircle2 size={16} className="text-primary-foreground" />
                        </div>
                        
                        <div className="rounded-md p-3 bg-secondary/50">
                          <p className="font-medium">{completion.taskTitle}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Completed at {completionTime}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Logbook;
