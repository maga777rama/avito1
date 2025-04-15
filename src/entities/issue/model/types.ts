export type TaskStatus = "Backlog" | "InProgress" | "Done";

export type TaskPriority = "Low" | "Medium" | "High";

export interface Issue {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignee: {
        id: number;
        fullName: string;
        email: string;
        avatarUrl: string;
    };
    boardId?: number;
    boardName: string;
}

export interface CreateIssue {
    assigneeId: number;
    boardId: number;
    description: string;
    priority: TaskPriority;
    title: string;
}

export interface IssueCardProps {
    issue: Issue;
    index?: number;
    draggable?: boolean;
}
