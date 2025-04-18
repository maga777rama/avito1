import { api } from "@/shared/api/base";
import { User, UserTasks } from "../model/types";

export const userApi = {
    getAll: (signal?: AbortSignal) =>
        api.get<{ data: User[] }>("/users", { signal }),

    getUserTasks: (id: number, signal?: AbortSignal) =>
        api.get<{ data: UserTasks[] }>(`/users/${id}/tasks`, { signal }),
};
