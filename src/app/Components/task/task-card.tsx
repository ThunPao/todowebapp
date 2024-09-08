"use client"
import { delTask } from "@/actions/delete-task";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useTask } from "../TaskProvider";
import { CheckTaskInputPage } from "@/app/Widgets/check-task";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Taskstatus } from "@prisma/client";
import { statusThai } from "../variables/taskStatusconvo";


interface TaskProps {
    curTask: {
        task_id: number;
        title: string;
        description: string;
        due_date: Date;
        isChecked: boolean;
        status: Taskstatus;
    }

}
export default function TaskCardPage({ curTask }: TaskProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { task, setTask } = useTask();
    const [isChanging, setChanging] = useState(false);

    const [modalElement, setModalElement] = useState<HTMLDialogElement | null>(null);
    useEffect(() => {
        const element = document.getElementById('taskEditmodal') as HTMLDialogElement;
        setModalElement(element);
    }, []);

    const handleDelete = async () => {
        await Swal.fire({
            title: "ยืนยันการลบ",
            showCancelButton: true,
            cancelButtonText: "ยกเลิก",
            confirmButtonText: "ยืนยัน"
        }).then(async (res) => {
            if (res.isConfirmed) {
                setIsLoading(true);
                setChanging(true);
                try {
                    const success = await delTask(curTask.task_id);
                    if (!success) {
                        setIsLoading(false);
                        setChanging(true);
                    }
                } catch (error) {
                    setIsLoading(true);
                    toast.error("ไม่สามารถลบได้")
                } finally {
                    setIsLoading(false);
                    setChanging(false);
                    toast.success("ลบสำเร็จ")
                    Swal.fire({ title: "ลบสำเร็จ", icon: "success", timer: 3000, timerProgressBar: true });
                }
            }

        });


    };

    const openModal = () => {
        if (modalElement) {
            setTask({
                ...task,
                task_id: curTask.task_id,
                title: curTask.title,
                description: curTask.description,
                due_date: curTask.due_date,
                status: curTask.status
                // isChecked: task.isChecked
            })
            modalElement.showModal();
        };
    }


    return (
        <div className="card space-y-4 shadow-md  dark:bg-base-300 border-2 border-base-100 hover:border-base-200">
            <div className={isChanging ? "opacity-60" : "opacity-100"}>
                <div className='p-2 space-y-3'>
                    <div className="flex gap-2 ">
                        <CheckTaskInputPage id={curTask.task_id} checkState={curTask.isChecked} />
                        <div className={curTask.isChecked ? 'line-through' : ''}>
                            {curTask.title}
                        </div>
                    </div>
                    <div className="py-3">
                        <small>{curTask.description}</small>
                    </div>

                    <hr></hr>
                    <div className="text-error">
                        ถึงวันที่ {new Date(task.due_date).toLocaleDateString('th-TH', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit',
                        })}
                    </div>
                </div>

                <div className='flex-1 gap-2 flex justify-between p-2'>
                    <div className={`badge py-3 text-white badge-outline
                        ${curTask.status === "PENDING" ? "badge-neutral" : ""}
                        ${curTask.status === "IN_PROGRESS" ? "badge-secondary" : ""}
                        ${curTask.status === "COMPLETED" ? "badge-success" : ""
                        }`}>
                        {statusThai(curTask.status)}
                    </div>

                    <div>

                        <button disabled={isChanging} onClick={openModal}>
                            <Icon className="text-success" icon="tabler:pencil" width="1.5em" height="1.5em" />
                        </button>
                        {isLoading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            <button disabled={isChanging} onClick={handleDelete} title="">
                                <Icon className='text-error' icon="tabler:trash-filled" width="1.5em" height="1.5em" />
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div >
    )
}