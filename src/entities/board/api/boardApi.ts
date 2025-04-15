import { api } from "@/shared/api/base";
import { Board, BoardIssue } from "../model/types";

export const boardApi = {
    getAll: (signal?: AbortSignal) =>
        api.get<{ data: Board[] }>("/boards", { signal }),

    getBoardTasks: (id: number, signal?: AbortSignal) =>
        api.get<{ data: BoardIssue[] }>(`/boards/${id}`, { signal }),
};
