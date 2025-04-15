import { api } from "@/shared/api/base";
import { CreateIssue, Issue, TaskStatus } from "../model/types";

export const issueApi = {
    getAll: (signal?: AbortSignal) =>
        api.get<{ data: Issue[] }>("/tasks", { signal }),

    createTask: (data: CreateIssue) =>
        api.post<{ data: { id: number } }>("/tasks/create", data),

    updateTask: (id: number, data: CreateIssue) =>
        api.put<{ data: { message: string } }>(`/tasks/update/${id}`, data),

    updateTaskStatus: (id: number, status: TaskStatus) =>
        api.put<{ data: { message: string } }>(`/tasks/updateStatus/${id}`, {
            status,
        }),

    getTaskById: (id: number, signal?: AbortSignal) =>
        api.get<{ data: Issue }>(`/tasks/${id}`, { signal }),
};
