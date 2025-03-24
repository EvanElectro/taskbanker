
import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      <div className="bg-secondary/50 rounded-full p-4 mb-4 text-muted-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-xs">{description}</p>
    </div>
  );
};

export default EmptyState;
