
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Plus, Check, Trash2, ArrowUpDown, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortTasks, getCompletionCountForTask, isTaskCompletedToday } from '../utils/taskUtils';
import { SortOption } from '../types';
import EmptyState from './EmptyState';

const TaskBank: React.FC = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion, sortOption, setSortOption } = useTaskContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  const sortedTasks = sortTasks(tasks, sortOption);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Task Bank</h2>
        <div className="flex items-center gap-2">
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mostUsed">Most Used</SelectItem>
              <SelectItem value="recentlyUsed">Recently Used</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
          <ArrowUpDown size={16} className="text-muted-foreground" />
        </div>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <Plus size={18} className="mr-1" />
          Add
        </Button>
      </form>

      {tasks.length === 0 ? (
        <EmptyState
          title="Your task bank is empty"
          description="Add tasks to your bank to get started"
          icon={<Archive size={48} />}
        />
      ) : (
        <ul className="space-y-2 mt-4">
          {sortedTasks.map((task) => {
            const completionCount = getCompletionCountForTask(task);
            const isCompletedToday = isTaskCompletedToday(task);

            return (
              <li
                key={task.id}
                className={`task-item p-4 rounded-lg border ${
                  isCompletedToday
                    ? 'bg-secondary/50 border-primary/20'
                    : 'bg-card border-border'
                } transition-all duration-200 hover:border-primary/30 flex items-center justify-between gap-4 group animate-scale-in`}
              >
                <div className="flex-1">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Used {completionCount} {completionCount === 1 ? 'time' : 'times'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isCompletedToday ? "secondary" : "outline"}
                    size="icon"
                    onClick={() => toggleTaskCompletion(task.id)}
                    aria-label={isCompletedToday ? "Mark as incomplete" : "Mark as complete"}
                    className="size-8"
                  >
                    <Check size={16} className={isCompletedToday ? "text-primary" : ""} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                    className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskBank;
