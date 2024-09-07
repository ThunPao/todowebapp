"use server"

import { delcurTask } from "@/db/queries/taskQueries"

export async function delTask(id: number): Promise<boolean> {
    try {
        await delcurTask(id);
        return true;
    } catch (error) {
        console.error('Error in toggleTask:', error);
        return false;
    }
}