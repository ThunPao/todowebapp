
import { Icon } from "@iconify/react";
import { Suspense, useContext } from "react";
import { CheckTaskInputPage } from "./check-task";
import TaskModalButton from "@/app/Widgets/taskModalBtn";
import { TaskColla } from "@/app/utilities/task";
import TaskEditerModal from "../modals/taskEditor";
import { TaskProvider } from "../TaskProvider";
import TaskDelBtn from "@/app/Widgets/taskDelBtn";

interface TaskListProps {
    fetchData: () => Promise<TaskColla[]>
}

export default async function TaskList({ fetchData }: TaskListProps) {
    await new Promise(resolve=> setTimeout(resolve,1500))

    const datas = await fetchData();
    const items = datas.map((task) => {
        return (
            <div key={task.task_id} className="card space-y-4 border-2">
                <Suspense fallback={<>Loading...</>}>


                    <div className=" ">
                        <div className='p-2'>
                            <div className="flex gap-2 ">
                                <CheckTaskInputPage title={task.title} id={task.task_id} checkState={task.isChecked} />
                            </div>
                            <small>{task.description}</small>
                            {/* แสดงเวลาจาก raw เช่น 1970-01-01T00:00:00.000Z ลบ index หลังจาก 10 ออก และเปลี่ยนจาก - เป็น / จะได้เวลาเป็น YYYY/MM/DD */}
                            <div className="text-error">Due Date {String(new Date(task.due_date).toISOString().slice(0, 10).replace(/-/g, '/'))}</div>
                        </div>
                        <div className='flex-1 gap-2 flex justify-end p-2'>
                            <div className='text-success'>
                                <TaskModalButton isEdit curTask={task}>
                                    <Icon icon="tabler:pencil" width="1.5em" height="1.5em" />
                                </TaskModalButton></div>
                            <div>
                                <TaskDelBtn id={task.task_id}>
                                    <Icon className='text-error' icon="tabler:trash-filled" width="1.5em" height="1.5em" />
                                </TaskDelBtn>
                            </div>
                        </div>

                    </div>
                </Suspense>

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