import { revalidatePath } from "next/cache";
import { db } from "..";
import { redirect } from "next/navigation";

export function fetchTasks() {
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
export async function checkTask(taskid: number,isCheck:boolean) {
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
    return revalidatePath("/", "page") // เคลีย Cache
}