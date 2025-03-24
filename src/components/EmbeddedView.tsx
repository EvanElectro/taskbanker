
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle2, Circle, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isTaskCompletedToday, formatTime } from '../utils/taskUtils';
import EmptyState from './EmptyState';

const EmbeddedView: React.FC = () => {
  const { 
    dailyTasks, 
    tasks,
    generateDailyTasks, 
    toggleTaskCompletion,
    addTask,
    clearDefaultTasks
  } = useTaskContext();
  
  const [taskCount, setTaskCount] = useState('3');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeTab, setActiveTab] = useState('daily');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  const handleGenerateTasks = () => {
    generateDailyTasks(parseInt(taskCount, 10));
  };

  const hasDefaultTasks = tasks.some(task => task.id.length <= 2);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
          <TabsTrigger value="bank">Task Bank</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4 mt-4">
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
              </SelectContent>
            </Select>
            
            <Button onClick={handleGenerateTasks} size="sm">
              <Sparkles size={16} className="mr-2" />
              Generate
            </Button>
          </div>

          {dailyTasks.length === 0 ? (
            <EmptyState
              title="No tasks for today"
              description="Generate tasks from your bank to get started"
              icon={<Sparkles size={32} />}
            />
          ) : (
            <ul className="space-y-2">
              {dailyTasks.map((task) => {
                const isCompleted = isTaskCompletedToday(task);

                return (
                  <li 
                    key={task.id}
                    className={`task-item relative p-3 rounded-lg border ${
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
                          <CheckCircle2 size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`font-medium text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        
                        {task.scheduledTime && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock size={12} />
                            <span>{formatTime(task.scheduledTime)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </TabsContent>
        
        <TabsContent value="bank" className="space-y-4 mt-4">
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background"
            />
            <Button type="submit" size="sm">Add</Button>
          </form>
          
          {hasDefaultTasks && (
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearDefaultTasks}
                className="text-muted-foreground text-xs"
              >
                Clear Starter Tasks
              </Button>
            </div>
          )}
          
          {tasks.length === 0 ? (
            <EmptyState
              title="Your task bank is empty"
              description="Add tasks to your bank to get started"
              icon={<Sparkles size={32} />}
            />
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => {
                const isCompleted = isTaskCompletedToday(task);

                return (
                  <li
                    key={task.id}
                    className={`task-item p-3 rounded-lg border ${
                      isCompleted
                        ? 'bg-secondary/50 border-primary/20'
                        : 'bg-card border-border'
                    } transition-all duration-200 hover:border-primary/30 flex items-center gap-2 group animate-scale-in`}
                  >
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="flex-shrink-0 text-primary transition-colors"
                      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Circle size={18} />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="font-medium text-sm">{task.title}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmbeddedView;
