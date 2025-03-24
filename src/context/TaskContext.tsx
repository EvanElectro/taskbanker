import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, DailyTask, SortOption, TaskContextType, ViewType } from '../types';
import { sortTasks, generateDefaultTasks } from '../utils/taskUtils';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('taskBank');
    return savedTasks ? JSON.parse(savedTasks) : generateDefaultTasks();
  });
  
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedDailyTasks = localStorage.getItem(`dailyTasks_${today}`);
    return savedDailyTasks ? JSON.parse(savedDailyTasks) : [];
  });
  
  const [activeView, setActiveView] = useState<ViewType>('daily');
  const [sortOption, setSortOption] = useState<SortOption>('recentlyUsed');

  useEffect(() => {
    localStorage.setItem('taskBank', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`dailyTasks_${today}`, JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completions: [],
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success('Task added to your bank');
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    setDailyTasks(prevDailyTasks => prevDailyTasks.filter(task => task.id !== id));
    toast.success('Task removed from your bank');
  };

  const clearDefaultTasks = () => {
    setTasks(prevTasks => prevTasks.filter(task => task.id.length > 2));
    setDailyTasks(prevDailyTasks => prevDailyTasks.filter(task => task.id.length > 2));
    toast.success('Starter tasks cleared');
  };

  const celebrateTaskCompletion = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const toggleTaskCompletion = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();
    let wasCompleted = false;
    let isNowCompleted = false;
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id !== id) return task;
        
        const existingCompletionIndex = task.completions.findIndex(
          c => c.date === today
        );
        
        let newCompletions = [...task.completions];
        
        if (existingCompletionIndex >= 0) {
          wasCompleted = newCompletions[existingCompletionIndex].completed;
          isNowCompleted = !wasCompleted;
          newCompletions[existingCompletionIndex] = {
            date: today,
            completed: isNowCompleted,
            timestamp: now
          };
        } else {
          isNowCompleted = true;
          newCompletions.push({
            date: today,
            completed: true,
            timestamp: now
          });
        }
        
        return {
          ...task,
          completions: newCompletions
        };
      })
    );
    
    setDailyTasks(prevDailyTasks =>
      prevDailyTasks.map(task => {
        if (task.id !== id) return task;
        
        const existingCompletionIndex = task.completions.findIndex(
          c => c.date === today
        );
        
        let newCompletions = [...task.completions];
        
        if (existingCompletionIndex >= 0) {
          wasCompleted = newCompletions[existingCompletionIndex].completed;
          isNowCompleted = !wasCompleted;
          newCompletions[existingCompletionIndex] = {
            date: today,
            completed: isNowCompleted,
            timestamp: now
          };
          
          if (isNowCompleted) {
            toast.success('Task completed! Great job!');
            celebrateTaskCompletion();
          }
        } else {
          isNowCompleted = true;
          newCompletions.push({
            date: today,
            completed: true,
            timestamp: now
          });
          
          toast.success('Task completed! Great job!');
          celebrateTaskCompletion();
        }
        
        return {
          ...task,
          completions: newCompletions
        };
      })
    );
  };

  const generateDailyTasks = (count: number) => {
    setDailyTasks([]);
    
    const shuffled = [...tasks].sort(() => 0.5 - Math.random());
    const selectedTasks = shuffled.slice(0, Math.min(count, shuffled.length));
    
    const newDailyTasks: DailyTask[] = selectedTasks.map((task, index) => ({
      ...task,
      order: index
    }));
    
    setDailyTasks(newDailyTasks);
    toast.success(`Generated ${newDailyTasks.length} tasks for today`);
  };

  const reorderDailyTask = (id: string, direction: 'up' | 'down') => {
    const currentIndex = dailyTasks.findIndex(task => task.id === id);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(dailyTasks.length - 1, currentIndex + 1);
    
    if (currentIndex === newIndex) return;
    
    const newDailyTasks = [...dailyTasks];
    const taskToMove = newDailyTasks[currentIndex];
    
    newDailyTasks.splice(currentIndex, 1);
    newDailyTasks.splice(newIndex, 0, taskToMove);
    
    const updatedTasks = newDailyTasks.map((task, idx) => ({
      ...task,
      order: idx
    }));
    
    setDailyTasks(updatedTasks);
  };

  const scheduleTask = (id: string, time: string | null) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, scheduledTime: time } : task
      )
    );
    
    setDailyTasks(prevDailyTasks =>
      prevDailyTasks.map(task => 
        task.id === id ? { ...task, scheduledTime: time } : task
      )
    );
    
    if (time) {
      toast.success('Task scheduled');
    } else {
      toast.success('Task schedule removed');
    }
  };

  const value = {
    tasks,
    dailyTasks,
    activeView,
    sortOption,
    addTask,
    deleteTask,
    clearDefaultTasks,
    toggleTaskCompletion,
    generateDailyTasks,
    reorderDailyTask,
    scheduleTask,
    setSortOption,
    setActiveView,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
