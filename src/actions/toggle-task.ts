"use server"

import { checkTask } from "@/db/queries/taskQueries"

export async function toggleTask(id: number, isChecked: boolean): Promise<boolean> {
    try {
        // Delay ปลอม
        // await new Promise((r) => setTimeout(r, 2000));
        await checkTask(id, isChecked);
        return true;
    } catch (error) {
        console.error('Error in toggleTask:', error);
        return false;
    }
}