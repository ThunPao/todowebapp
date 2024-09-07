"use client"
import { delTask } from "@/actions/delete-task";
import { useState } from "react";
import Swal from "sweetalert2";

interface TaskProps {
    children: React.ReactNode
    id: number;
}

export default function TaskDelBtn({ children, id }: TaskProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);

        // await Swal.fire({
        //     title: "ยืนยันการลบ"
        // }).then(async (res) => {
        //     if (res.isConfirmed) {
        //         try {
        //             const success = await delTask(id);
        //             if (!success) {
        //                 setIsLoading(false);
        //             }
        //         } catch (error) {
        //             setIsLoading(true);
        //         } finally {
        //             setIsLoading(false);
        //             Swal.fire("Saved!", "", "success");
        //         }
        //     }
        // })


    };

    return (
        <>
            {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
            ) : (
                <button onClick={handleDelete} title="">
                    <input type="hidden" defaultValue={id} name="id" />
                    {children}
                </button>
            )}
        </>)
}