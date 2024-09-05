"use client"
import * as actions from "@/actions"
import { useFormState } from "react-dom";

interface TaskProps {
    children: React.ReactNode
    id: number;
}

export default function TaskDelBtn({ children, id }: TaskProps) {
    const [delState, delTodo] = useFormState(actions.deleteTodo, {
        errors: {},
    });
    return (<>
        <form action={delTodo}>
            <button formAction={delTodo}>
                <input type="hidden" defaultValue={id} name="id" />
                {children}
            </button>
        </form>

    </>)
}