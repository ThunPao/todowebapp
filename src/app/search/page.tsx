import { fetchSearchTasks } from '@/db/queries/taskQueries';
import { Suspense } from 'react';
import TaskLoadSkeletonPage from '../Widgets/taskLoadSkeleton';
import { redirect } from 'next/navigation';
import TaskList from '../Components/task/list-tasks';

interface SearchProps {
    searchParams: {
        term: string;
    }
}

export default async function SearchPage({ searchParams }: SearchProps) {
    const { term } = searchParams;
    if (!term) {
        redirect('/')
    }
    return (
        <>
            <div className="container mx-auto   py-16 space-y-4 px-4 lg:px-40">
                <div className="text-4xl font-bold">Todo List : รายการที่ต้องทำ</div>
                <Suspense fallback={<TaskLoadSkeletonPage />}>
                    <TaskList fetchData={() => fetchSearchTasks(term)} />
                </Suspense>
            </div>
        </>
    );
}
