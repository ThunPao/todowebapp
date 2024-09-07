"use client"
import { delTask } from "@/actions/delete-task";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useTask } from "../TaskProvider";
import { CheckTaskInputPage } from "@/app/Widgets/check-task";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";


interface TaskProps {
    curTask: {
        task_id: number;
        title: string;
        description: string;
        due_date: Date;
        isChecked: boolean;
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
                // isChecked: task.isChecked
            })
            modalElement.showModal();
        };
    }


    return (
        <div className="card space-y-4 shadow-md  dark:bg-base-300 border-2 border-base-100 hover:border-base-200">
            <div className={isChanging ? "opacity-60" : "opacity-100"}>
                <div className='p-2'>
                    <div className="flex gap-2 ">
                        <CheckTaskInputPage id={curTask.task_id} checkState={curTask.isChecked} />
                        <div className={curTask.isChecked ? 'line-through' : ''}>
                            {curTask.title}
                        </div>
                    </div>

                    <small>{curTask.description}</small>
                    {/* แสดงเวลาจาก raw เช่น 1970-01-01T00:00:00.000Z ลบ index หลังจาก 10 ออก และเปลี่ยนจาก - เป็น / จะได้เวลาเป็น YYYY/MM/DD */}
                    <div className="text-error">Due Date {String(new Date(task.due_date).toISOString().slice(0, 10).replace(/-/g, '/'))}</div>
                </div>
                <div className='flex-1 gap-2 flex justify-end p-2'>
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
        </div >
    )
}