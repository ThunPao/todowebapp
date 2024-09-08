"use client"
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

export default function SearchTaskPage() {
    const searchParams = useSearchParams();

    return (
        <>
            <form action={actions.searchTodos}>
                <div className="join">
                    <select className="select select-bordered join-item"
                        name="status" id="">
                        <option value="">ทั้งหมด</option>
                        <option value="PENDING">ยังไม่ดำเนินการ</option>
                        <option value="IN_PROGRESS">กำลังดำเนินการ</option>
                        <option value="COMPLETED">ดำเนินการเสร็จสิ้น</option>
                    </select>
                    <button className="btn join-item" formAction={actions.searchTodos}>ค้นหา</button>
                </div>
            </form>
        </>
    );
}
