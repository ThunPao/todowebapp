"use client";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useTask } from '../TaskProvider';
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";


export default function TaskEditerModal() {
  const curDate = new Date().toISOString().split("T")[0];
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { task } = useTask();

  // formState เพิ่ม แก้ไข ลบ
  const [addState, addTodo] = useFormState(actions.addTodo, {
    errors: {},
  });
  const [editState, editTodo] = useFormState(actions.editTodo, {
    errors: {},
  });
  const [deleteState, deleteTodo] = useFormState(actions.deleteTodo, {
    errors: {},
  });
  const [initialTask, setInitialTask] = useState<any>(null);

  // อัปเดท task ให้ตรงตาม provider เพื่อให้ task คงค่า value ดั้งเดิม
  useEffect(() => {
    if (task) {
      setInitialTask({ ...task });
    }
  }, [task]);
  const curState = task.task_id ? editState : addState;
  const curAction = task.task_id ? editTodo : addTodo;

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  useEffect(() => {
    if (formRef.current) {
      // เคลีย form input data เพื่อให้ค่า defaultValue task จาก provider แทนที่
      formRef.current.reset();
    }
  }, [task]);
  return (
    <>
      <dialog id="taskEditmodal" ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="inline-flex items-center gap-4">

            <h3 className="font-bold text-lg">Task</h3>
            {task.task_id > 0 && (
              <form action={deleteTodo}>
                <input name="id" type="hidden" defaultValue={task.task_id} />
                <button formAction={deleteTodo} title="Delete" className="btn btn-error btn-outline btn-sm">
                  <Icon icon="tabler:trash-filled" width="1.5em" height="1.5em" />
                  ลบ {task.task_id}</button>
              </form>
            )}

          </div>

          {curState.errors._form ? (
            <div className="p-2 bg-red-200 border border-red-400 rounded">
              {editState.errors._form?.join(",")}
            </div>
          ) : null}
          {/* Form Input */}
          <form ref={formRef} onSubmit={closeModal} action={curAction} className="flex flex-col space-y-4">
            {/* Title */}
            <input name="id" type="hidden" defaultValue={task.task_id} />
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Title <small className="text-red-500">*</small>
                </span>
              </div>
              <input name="title" type="text" defaultValue={task.title} placeholder="Task Title" required className="input input-bordered" />
            </label>
            {/* Description */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Description <small className="text-red-500">*</small>
                </span>
              </div>
              <textarea name="description" defaultValue={task.description} placeholder="Task Description" required className="input min-h-20 max-h-64 input-bordered" />
            </label>
            {/* Due Date */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Due <small className="text-red-500">*</small>
                </span>
              </div>
              <input
                type="date"
                name="dueDate"
                min={curDate}
                defaultValue={task.due_date.toISOString().slice(0, 10)}
                placeholder="Task Title"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <div className="py-4">
           
              <button onSubmit={closeModal} formAction={curAction} type="submit" title="" className="btn w-full btn-primary">
                {task.task_id ? "Edit" : "Add"} Task
              </button>
            </div>
          </form>
        </div>
      </dialog >
    </>
  );
}
