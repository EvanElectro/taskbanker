
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Toaster as SonnerToaster } from 'sonner';
import Index from './pages/Index';
import Embedded from './pages/Embedded';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/embedded" element={<Embedded />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
      <SonnerToaster position="bottom-right" />
    </TaskProvider>
  );
}

export default App;
