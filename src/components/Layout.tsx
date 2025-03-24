
import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Archive, Calendar, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activeView, setActiveView } = useTaskContext();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full py-6 px-4 sm:px-6 md:px-8 border-b border-border bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            TaskBank
          </h1>
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveView('bank')}
              className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
                activeView === 'bank'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
              aria-label="Task Bank"
            >
              <Archive size={20} />
            </button>
            <button
              onClick={() => setActiveView('daily')}
              className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
                activeView === 'daily'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
              aria-label="Daily Tasks"
            >
              <Calendar size={20} />
            </button>
            <button
              onClick={() => setActiveView('logbook')}
              className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
                activeView === 'logbook'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
              aria-label="Logbook"
            >
              <BookOpen size={20} />
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
      
      <footer className="py-6 border-t border-border bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center text-sm text-muted-foreground">
          TaskBank &copy; {new Date().getFullYear()} • Designed with simplicity in mind
        </div>
      </footer>
    </div>
  );
};

export default Layout;
