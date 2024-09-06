import TaskList from './Components/task/list-tasks';
import { fetchTasks,fetchrawTasks } from '@/db/queries/taskQueries';
import { Suspense } from 'react';
import TaskLoadSkeletonPage from './Widgets/taskLoadSkeleton';

export default async function Home() {

  return (
    <>
      <div className="container mx-auto   py-16 space-y-4 px-4 lg:px-40">

        <div className="text-5xl font-bold">Todo List</div>
          <Suspense fallback={<TaskLoadSkeletonPage/>}>
            <TaskList fetchData={() => fetchTasks()} />
          </Suspense>
      </div>
    </>
  );
}
