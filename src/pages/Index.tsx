
import React from 'react';
import Layout from '@/components/Layout';
import TaskBank from '@/components/TaskBank';
import DailyTasks from '@/components/DailyTasks';
import Logbook from '@/components/Logbook';
import { useTaskContext } from '@/context/TaskContext';

const Index = () => {
  const { activeView } = useTaskContext();

  return (
    <Layout>
      {activeView === 'bank' && <TaskBank />}
      {activeView === 'daily' && <DailyTasks />}
      {activeView === 'logbook' && <Logbook />}
    </Layout>
  );
};

export default Index;
