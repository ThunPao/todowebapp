"use client"

import * as actions from "@/actions";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useTask } from "../TaskProvider";
import { Taskstatus } from "@prisma/client";

export default function SearchTaskPage() {
    const searchParams = useSearchParams();
    const curSearch = searchParams.get("term") as Taskstatus;
    const { isLoading, setIsLoading } = useTask();
    const [status, setStatus] = useState<Taskstatus>(curSearch);
    const [editState, editTodo] = useFormState(actions.searchTodos, {
    });



    useEffect(() => {
        if (editState.success) {
            setIsLoading(false);
            redirect(`/search?term=${status}`)
        } else {
        }
    }, [editState]);

    //เปลี่ยนสถานะ ของ Status เวลาเลือก
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as Taskstatus;
        setStatus(newStatus);
    };

    return (
        <>
            <form onSubmit={() => setIsLoading(true)} action={editTodo}>
                <div className="join">
                    <select onChange={handleChange} value={status} defaultValue={curSearch} className="select select-bordered join-item"
                        name="status" id="">
                        <option value="">ทั้งหมด</option>
                        <option value="PENDING">ยังไม่ดำเนินการ</option>
                        <option value="IN_PROGRESS">กำลังดำเนินการ</option>
                        <option value="COMPLETED">ดำเนินการเสร็จสิ้น</option>
                    </select>
                    <button disabled={isLoading} className="btn join-item" formAction={editTodo}>
                        {isLoading && (
                            <span className="loading loading-spinner loading-md"></span>

                        )}
                        ค้นหา</button>
                </div>
            </form>
        </>
    );
}
