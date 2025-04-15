import { Issue } from "@/entities/issue/model/types.ts";

export interface Board {
    id: number;
    name: string;
    description: string;
    taskCount: number;
}

export type BoardIssue = Omit<Issue, "boardId" | "boardName">;
