
import React from 'react';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { isTaskCompletedToday, formatTime } from '@/utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onSchedule?: (id: string) => void;
  showTime?: boolean;
  className?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleCompletion, 
  onSchedule, 
  showTime = true,
  className = ''
}) => {
  const isCompleted = isTaskCompletedToday(task);
  
  return (
    <div 
      className={`flex items-center gap-3 p-4 rounded-lg border ${
        isCompleted 
          ? 'bg-secondary/50 border-primary/20' 
          : 'bg-card border-border'
      } transition-all duration-200 hover:border-primary/30 ${className}`}
    >
      <button
        onClick={() => onToggleCompletion(task.id)}
        className="flex-shrink-0 text-primary transition-colors"
        aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
      >
        {isCompleted ? (
          <CheckCircle2 size={24} />
        ) : (
          <Circle size={24} />
        )}
      </button>
      
      <div className="flex-1">
        <h3 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </h3>
        
        {showTime && task.scheduledTime && (
          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>{formatTime(task.scheduledTime)}</span>
          </div>
        )}
      </div>
      
      {onSchedule && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSchedule(task.id)}
          aria-label="Schedule task"
          className={`size-8 ${task.scheduledTime ? 'text-primary' : ''}`}
        >
          <Clock size={16} />
        </Button>
      )}
    </div>
  );
};

export default TaskItem;
