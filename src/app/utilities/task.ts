import { Taskpriority, Taskstatus } from "@prisma/client";

export interface TaskColla {
    task_id: number;
    title: string;
    description: string;
    isChecked: boolean;
    due_date: Date;
    status: Taskstatus;
    priority: Taskpriority;
}
