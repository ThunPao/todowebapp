
import { Icon } from "@iconify/react";
import { Suspense, useContext } from "react";
import { CheckTaskInputPage } from "../../Widgets/check-task";
import TaskModalButton from "@/app/Widgets/taskModalBtn";
import { TaskColla } from "@/app/utilities/task";
import TaskEditerModal from "../modals/taskEditor";
import { TaskProvider } from "../TaskProvider";
import TaskDelBtn from "@/app/Widgets/taskDelBtn";
import TaskCardPage from "./task-card";

interface TaskListProps {
    fetchData: () => Promise<TaskColla[]>
}

export default async function TaskList({ fetchData }: TaskListProps) {
    await new Promise(resolve=> setTimeout(resolve,1500))

    const datas = await fetchData();
    const items = datas.map((task) => {
        return (
            <div key={task.task_id}>
                <TaskCardPage curTask={task}/>
            </div>

        )
    })
    return <div>
        
        <TaskProvider>
            <TaskEditerModal />
            <div className="flex justify-between py-4">
                <div className="">
                    <div>
                        <p className="font-bold text-lg">My Tasks</p>
                        <small className="text-sm">You have {items.length} task{items.length > 1 ? "s" : null} left</small>
                    </div>
                </div>
                <TaskModalButton isEdit={false}>
                    <div className="btn bg-primary text-white">Add Task</div>
                </TaskModalButton>
            </div>
            <div className='grid lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {items}
            </div>
        </TaskProvider>

    </div>

}