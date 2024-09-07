"use client"
import * as actions from "@/actions"
import { delTask } from "@/actions/delete-task";
import { delcurTask } from "@/db/queries/taskQueries";
import { useState } from "react";
import { useFormState } from "react-dom";

interface TaskProps {
    children: React.ReactNode
    id: number;
}

export default function TaskDelBtn({ children, id }: TaskProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const success = await delTask(id);
            if (!success) {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(true);
        } finally {
            setIsLoading(false);
        }
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