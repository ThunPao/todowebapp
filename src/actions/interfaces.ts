
import { Tasks } from "@prisma/client";

export interface CreateItemResult {
    data?: Tasks;
    errors: {
        content?: string[];
        _form?: string[];
    };
    success?: boolean;
}