import { Issue } from "@/entities/issue";

export interface BoardColumnProps {
    title: string;
    status: "Backlog" | "InProgress" | "Done";
    tasks: Issue[];
}
