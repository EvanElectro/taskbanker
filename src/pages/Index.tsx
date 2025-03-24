
import React from 'react';
import Layout from '@/components/Layout';
import EmbeddedLayout from '@/components/EmbeddedLayout';
import TaskBank from '@/components/TaskBank';
import DailyTasks from '@/components/DailyTasks';
import Logbook from '@/components/Logbook';
import EmbeddedView from '@/components/EmbeddedView';
import { useTaskContext } from '@/context/TaskContext';

const Index = () => {
  const { activeView } = useTaskContext();

  // Use the embedded layout for the embedded view
  if (activeView === 'embedded') {
    return (
      <EmbeddedLayout>
        <EmbeddedView />
      </EmbeddedLayout>
    );
  }

  // Use the regular layout for other views
  return (
    <Layout>
      {activeView === 'bank' && <TaskBank />}
      {activeView === 'daily' && <DailyTasks />}
      {activeView === 'logbook' && <Logbook />}
    </Layout>
  );
};

export default Index;
