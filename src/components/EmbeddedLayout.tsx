
import React from 'react';

interface EmbeddedLayoutProps {
  children: React.ReactNode;
}

const EmbeddedLayout: React.FC<EmbeddedLayoutProps> = ({ children }) => {
  return (
    <div className="bg-background flex flex-col h-full w-full">
      <main className="flex-1 py-4 px-4">
        <div className="mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default EmbeddedLayout;
