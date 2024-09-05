"use client";
import { ReactNode, useEffect, useState } from 'react';
import { defaultTask, useTask } from '../Components/TaskProvider';
import { TaskColla } from '../utilities/task';


interface Props {
  children: ReactNode;
  isEdit: boolean;
  taskId?: number;
  curTask?: TaskColla
}


export default function TaskModalButton({ children, isEdit, curTask }: Props) {
  const [modalElement, setModalElement] = useState<HTMLDialogElement | null>(null);
  const { task, setTask } = useTask();

  useEffect(() => {
    const element = document.getElementById('taskEditmodal') as HTMLDialogElement;
    setModalElement(element);
  }, []);

  const openModal = () => {
    if (modalElement) {
      if (!curTask) {
        setTask({
          ...
          defaultTask
        })
      } else
        setTask({
          ...task,
          task_id: curTask.task_id,
          title: curTask.title,
          description: curTask.description,
          due_date: curTask.due_date,
          // isChecked: task.isChecked
        })
      modalElement.showModal();
    }
  };

  return (
    <>
      {modalElement && (
        <button title={isEdit && curTask ? 'Edit Task' : 'Add Task'} onClick={openModal}>
          {children}
        </button>
      )}
    </>
  );
}
