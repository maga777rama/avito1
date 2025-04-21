import { BoardIssue } from "@/entities/board";

export interface BoardColumnProps {
    title: string;
    status: "Backlog" | "InProgress" | "Done";
    tasks: BoardIssue[];
}
