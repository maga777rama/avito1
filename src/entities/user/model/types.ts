import { TaskPriority, TaskStatus } from "@/entities/issue/model/types.ts";

export interface User {
    id: number;
    fullName: string;
    email: string;
    description: string;
    avatarUrl: string;
    teamId: number;
    teamName: string;
    taskCount: number;
}

export interface UserTasks {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    boardName: string;
    priority: TaskPriority;
}
