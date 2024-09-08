"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { CreateItemResult } from "./interfaces";
import { redirect, useSearchParams } from "next/navigation";
import { db } from '@/db';
import { paths } from '@/paths';
import { Tasks, Taskstatus } from "@prisma/client";
export async function searchTodos(formData: FormData) {
    const term = formData.get("status")
    if (typeof term !== 'string' || !term) {
        redirect('/');
    }
    redirect(`/search?term=${term}`)
}
export async function editTodo(formState: CreateItemResult, formData: FormData): Promise<CreateItemResult> {
    try {
        const id = Number(formData.get("id"))
        const title = String(formData.get("title"))
        const description = String(formData.get("description"))
        const dueDate = new Date(String((formData.get("dueDate"))))
        const status = formData.get("curStatus") as Taskstatus;
        const updateData: Tasks = await db.tasks.update({
            where: { task_id: id },
            data: {
                title: title,
                description: description,
                due_date: dueDate,
                status: Taskstatus[status]
            }
        })
        // revalidatePath(paths.home()) //เคลีย Cache
        revalidateTag("tasks")

        return { success: true, data: updateData, errors: {}, message: "แก้ไขสำเร็จ" };
        // return { success: true, errors: {} };
    } catch (error) {
        return { message: "ไม่สามารถแก้ไขได้", errors: { _form: ["Something went wrong"] } }
    }

}


export async function addTodo(formState: CreateItemResult, formData: FormData): Promise<CreateItemResult> {
    try {
        const title = String(formData.get("title"))
        const description = String(formData.get("description"))
        const dueDate = new Date(String((formData.get("dueDate"))))

        const updateData = await db.tasks.create({
            data: {
                title: title,
                description: description,
                due_date: dueDate
            }
        })
        // revalidatePath(paths.home()) //เคลีย Cache
        revalidateTag("tasks");
        return { success: true, data: updateData, errors: {}, message: "เพิ่มสำเร็จ" };
    } catch (error) {
        console.error(error)
        return { message: "ไม่สามารถเพิ่ม Todo", errors: { _form: ["Something went wrong"] } }
    }

}
export async function deleteTodo(formState: CreateItemResult, formData: FormData): Promise<CreateItemResult> {
    try {
        const id = Number(formData.get("id"))
        const deleteData = await db.tasks.delete({
            where: { task_id: id },
        })
        // revalidatePath(paths.home()) //เคลีย Cache
        revalidateTag("tasks");

        return { success: true, data: deleteData, errors: {}, message: "ลบสำเร็จ" };
    } catch (error) {
        console.error(error)
        return { message: "ไม่สามารถลบ Todo", errors: { _form: ["Something went wrong"] } }

    }
}