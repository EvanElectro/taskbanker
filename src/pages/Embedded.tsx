
import React, { useEffect } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import EmbeddedLayout from '@/components/EmbeddedLayout';
import EmbeddedView from '@/components/EmbeddedView';

const Embedded = () => {
  const { setActiveView } = useTaskContext();
  
  // Set the view to embedded when this component mounts
  useEffect(() => {
    setActiveView('embedded');
    
    // This will help make the iframe responsive
    const sendHeightToParent = () => {
      const height = document.body.scrollHeight;
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'resize', height }, '*');
      }
    };
    
    // Initialize and set up observer
    sendHeightToParent();
    window.addEventListener('resize', sendHeightToParent);
    
    // Set up a mutation observer to detect DOM changes
    const observer = new MutationObserver(sendHeightToParent);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true 
    });
    
    return () => {
      window.removeEventListener('resize', sendHeightToParent);
      observer.disconnect();
    };
  }, [setActiveView]);
  
  return (
    <EmbeddedLayout>
      <EmbeddedView />
    </EmbeddedLayout>
  );
};

export default Embedded;
