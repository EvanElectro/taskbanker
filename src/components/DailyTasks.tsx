
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Circle, 
  ChevronUp, 
  ChevronDown, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { isTaskCompletedToday, formatTime } from '../utils/taskUtils';
import TimePicker from './TimePicker';
import EmptyState from './EmptyState';

const DailyTasks: React.FC = () => {
  const { 
    dailyTasks, 
    generateDailyTasks, 
    toggleTaskCompletion, 
    reorderDailyTask, 
    scheduleTask 
  } = useTaskContext();
  
  const [taskCount, setTaskCount] = useState('3');
  const [activeTimePickerId, setActiveTimePickerId] = useState<string | null>(null);

  const handleGenerateTasks = () => {
    generateDailyTasks(parseInt(taskCount, 10));
  };

  const handleOpenTimePicker = (taskId: string) => {
    setActiveTimePickerId(taskId);
  };

  const handleCloseTimePicker = () => {
    setActiveTimePickerId(null);
  };

  const handleTimeSelected = (taskId: string, time: string | null) => {
    scheduleTask(taskId, time);
    handleCloseTimePicker();
  };

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Today</p>
        <h2 className="text-2xl font-semibold tracking-tight">{formattedDate}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={taskCount}
          onValueChange={setTaskCount}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Task count" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Task</SelectItem>
            <SelectItem value="2">2 Tasks</SelectItem>
            <SelectItem value="3">3 Tasks</SelectItem>
            <SelectItem value="4">4 Tasks</SelectItem>
            <SelectItem value="5">5 Tasks</SelectItem>
            <SelectItem value="6">6 Tasks</SelectItem>
          </SelectContent>
        </Select>
        
        <Button onClick={handleGenerateTasks}>
          <Sparkles size={16} className="mr-2" />
          Generate Tasks
        </Button>
      </div>

      {dailyTasks.length === 0 ? (
        <EmptyState
          title="No tasks for today"
          description="Generate tasks from your bank to get started"
          icon={<Sparkles size={48} />}
        />
      ) : (
        <ul className="space-y-3 mt-6">
          {dailyTasks.map((task) => {
            const isCompleted = isTaskCompletedToday(task);
            const isTimePickerActive = activeTimePickerId === task.id;

            return (
              <li 
                key={task.id}
                className={`task-item relative p-4 rounded-lg border ${
                  isCompleted 
                    ? 'bg-secondary/50 border-primary/20' 
                    : 'bg-card border-border'
                } transition-all duration-200 hover:border-primary/30 animate-fade-in`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
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
                    
                    {task.scheduledTime && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>{formatTime(task.scheduledTime)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenTimePicker(task.id)}
                      aria-label="Schedule task"
                      className={`size-8 ${task.scheduledTime ? 'text-primary' : ''}`}
                    >
                      <Clock size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => reorderDailyTask(task.id, 'up')}
                      disabled={task.order === 0}
                      aria-label="Move task up"
                      className="size-8"
                    >
                      <ChevronUp size={16} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => reorderDailyTask(task.id, 'down')}
                      disabled={task.order === dailyTasks.length - 1}
                      aria-label="Move task down"
                      className="size-8"
                    >
                      <ChevronDown size={16} />
                    </Button>
                  </div>
                </div>
                
                {isTimePickerActive && (
                  <div className="absolute right-0 mt-2 z-10">
                    <TimePicker
                      taskId={task.id}
                      initialTime={task.scheduledTime || undefined}
                      onTimeSelected={handleTimeSelected}
                      onClose={handleCloseTimePicker}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DailyTasks;
