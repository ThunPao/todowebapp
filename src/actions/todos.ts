"use server"

import { revalidatePath } from "next/cache";
import { CreateItemResult } from "./interfaces";
import { redirect } from "next/navigation";
import { db } from '@/db';
import { paths } from '@/paths';
import { Tasks } from "@prisma/client";

export async function editTodo(formState: CreateItemResult, formData: FormData): Promise<CreateItemResult> {
    try {
        const id = Number(formData.get("id"))
        const title = String(formData.get("title"))
        const description = String(formData.get("description"))
        const dueDate = new Date(String((formData.get("dueDate"))))

        const updateData: Tasks = await db.tasks.update({
            where: { task_id: id },
            data: {
                title: title,
                description: description,
                due_date: dueDate,
            }
        })
        revalidatePath(paths.home()) //เคลีย Cache
        return { success: true, data: updateData, errors: {} };
        // return { success: true, errors: {} };
    } catch (error) {
        return { errors: { _form: ["Something went wrong"] } }
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
        revalidatePath(paths.home()) //เคลีย Cache
        return { success: true, data: updateData, errors: {} };
    } catch (error) {
        console.error(error)
        return { errors: { _form: ["Something went wrong"] } }
    }

}
export async function deleteTodo(formState: CreateItemResult, formData: FormData): Promise<CreateItemResult> {
    try {
        const id = Number(formData.get("id"))
        const deleteData = await db.tasks.delete({
            where: { task_id: id },
        })
        revalidatePath(paths.home()) //เคลีย Cache

        return { success: true,data: deleteData, errors: {} };
    } catch (error) {
        console.error(error)
        return { errors: { _form: ["Something went wrong"] } }

    }
}