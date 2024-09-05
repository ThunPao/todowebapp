"use server"

import { cookies } from "next/headers"

export async function setTheme(theme: string): Promise<void> {
    const cookieStore = cookies();
    cookieStore.set("theme", theme, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }); // 30 days from now
}
export async function getTheme(): Promise<string> {
    const cookieStore = cookies();
    const curTheme = cookieStore.get("theme");
    return String(curTheme) || "light";
}