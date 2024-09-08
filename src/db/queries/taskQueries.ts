import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { db } from "..";
import { redirect } from "next/navigation";
import { cache } from "react";
import { Taskstatus } from "@prisma/client";

export const fetchTasks = unstable_cache(() => {
    return db.tasks.findMany(
        {
            select: {
                task_id: true,
                title: true,
                description: true,
                due_date: true,
                isChecked: true,
                status: true
            }
        }

    );
}, ['tasks'], { revalidate: 3600, tags: ["tasks"] }
);
export async function fetchSearchTasks(term: string) {
    const status = term as Taskstatus || undefined;
    if (!status) {
        return redirect(`/search`)
    }
    return await db.tasks.findMany(
        {
            select: {
                task_id: true,
                title: true,
                description: true,
                due_date: true,
                isChecked: true,
                status: true
            },
            where: {
                status: Taskstatus[status]
            },
        }
    );
}

export async function fetchrawTasks() {
    await new Promise(resolve => setTimeout(resolve, 2500))
    return db.tasks.findMany(
        {
            select: {
                task_id: true,
                title: true,
                description: true,
                due_date: true,
                isChecked: true,
            }
        }
    );
}
export async function delcurTask(taskId: number) {
    await db.tasks.delete({
        where: {
            task_id: taskId
        }
    })
    revalidateTag("tasks");
}
export async function checkTask(taskid: number, isCheck: boolean) {
    await db.tasks.update({
        select: {
            title: true,
        },
        where: { task_id: taskid },
        data: {
            isChecked: !isCheck
        }
    }).then((e) => {
        // console.log("เปลี่ยนสถานะ: " + e.title);
    }).catch((e) => {
        console.error("เจอ Error: " + e.title);
    })
    return revalidateTag("tasks");
    // return revalidatePath("/", "page") // เคลีย Cache
}