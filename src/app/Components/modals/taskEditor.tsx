"use client";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useTask } from '../TaskProvider';
import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

// import '@sweetalert2/theme-borderless/borderless.css';

import Swal from "sweetalert2/dist/sweetalert2.js";
import { Taskpriority, Taskstatus } from "@prisma/client";

// import withReactContent from 'sweetalert2-react-content'



export default function TaskEditerModal() {
  const curDate = new Date().toISOString().split("T")[0];
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { task, isLoading, setIsLoading } = useTask();
  const [status, setStatus] = useState<Taskstatus>(task.status || "PENDING");
  const [priority, setPrity] = useState<Taskpriority>(task.priority || "LOW");

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
      setStatus(task.status);
      setPrity(task.priority);
      setInitialTask({ ...task })
      setIsLoading(false);
    }
  }, [task]);
  const curState = task.task_id ? editState : addState;
  const curAction = task.task_id ? editTodo : addTodo;

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  const Loading = () => {
    setIsLoading(true);
  }
  // Closed Modal ตอน action สำเร็จ
  useEffect(() => {
    if (formRef.current) {
      if (curState) {
        if (curState.success) {
          setIsLoading(false);
          toast.success(curState.message);
          Swal.fire({ title: curState.message, timer: 3000, timerProgressBar: true, icon: "success" })
        } else {
          // Swal.fire({ title: curState.message})
          toast.error(curState.message);
        }
      }
      formRef.current.reset();
      closeModal();
    }
  }, [editState, addState]);


  useEffect(() => {
    if (formRef.current) {
      if (deleteState && deleteState.success) {
        setIsLoading(false);
      }
      closeModal();
    }
  }, [deleteState]);

  //เปลี่ยนสถานะ ของ Status เวลาเลือก
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Taskstatus;
    setStatus(newStatus);
  };

  const handleChangePr = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Taskpriority;
    setPrity(newStatus);
  };
  return (
    <>
      <dialog id="taskEditmodal" ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="inline-flex items-center gap-4">

            <h3 className="font-bold text-lg">{task.task_id > 0 ? "Edit" : "Add"} Task</h3>
            {/* {task.task_id > 0 && (
              <form onSubmit={Loading} action={deleteTodo}>
                <input name="id" type="hidden" defaultValue={task.task_id} />
                <button
                  disabled={isLoading}
                  formAction={deleteTodo} title="Delete" className="btn btn-error btn-outline btn-sm">
                  <Icon icon="tabler:trash-filled" width="1.5em" height="1.5em" />
                  Remove</button>
              </form>
            )} */}

          </div>

          {curState.errors._form ? (
            <div className="p-2 bg-red-200 border border-red-400 rounded">
              {editState.errors._form?.join(",")}
            </div>
          ) : null}
          {/* Form Input */}
          <form ref={formRef} onSubmit={Loading} action={curAction} className="flex flex-col space-y-4">
            {/* Title */}
            <input name="id" type="hidden" defaultValue={task.task_id} />
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  หัวข้อ <small className="text-red-500">*</small>
                </span>
              </div>
              <input
                disabled={isLoading}

                name="title" maxLength={256} type="text" defaultValue={task.title} placeholder="Task Title" required className="input input-bordered" />
            </label>
            {/* Description */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  รายละเอียด <small className="text-red-500">*</small>
                </span>
              </div>
              <textarea
                disabled={isLoading}

                name="description" maxLength={256} defaultValue={task.description} placeholder="Task Description" required className="input min-h-20 max-h-64 input-bordered" />
            </label>
            {/* Due Date */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  กำหนดการ <small className="text-red-500">*</small>
                </span>
              </div>
              <input
                disabled={isLoading}
                type="date"
                name="dueDate"
                min={curDate}
                defaultValue={new Date(task.due_date).toISOString().slice(0, 10)}
                placeholder="Task Title"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            {/* Status */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">สถานะ</span>
              </div>
              <select name="curStatus" onChange={handleChange} value={status} className="select select-bordered">
                <option value="PENDING">ยังไม่ดำเนินการ</option>
                <option value="IN_PROGRESS">กำลังดำเนินการ</option>
                <option value="COMPLETED">ดำเนินการเสร็จสิ้น</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">ความเร่งด่วน</span>
              </div>
              <select name="priority" onChange={handleChangePr} value={priority} className="select select-bordered">
                <option value="LOW">ช้า</option>
                <option value="MEDIUM">ปานกลาง</option>
                <option value="HIGH">เร่งด่วน</option>
              </select>
            </label>

            <div className="py-4">
              {isLoading ? (
                <button disabled className="btn w-full btn-primary">
                  <span className="loading loading-spinner"></span>
                  รอสักครู่
                </button>
              ) : (
                <button onSubmit={closeModal} formAction={curAction} type="submit" title="" className="btn w-full btn-primary">
                  {task.task_id ? "Edit" : "Add"} Task
                </button>
              )}

            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
