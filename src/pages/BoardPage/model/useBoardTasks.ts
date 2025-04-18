import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { issueApi } from "@/entities/issue";

export const useBoardTasks = () => {
    const { id } = useParams();
    const boardId = Number(id);

    const { data = [], isLoading } = useQuery({
        queryKey: ["issues"],
        queryFn: async ({ signal }) => {
            const res = await issueApi.getAll(signal);
            return res.data.data;
        },
        select: (data) => {
            return data.filter((task) => task.boardId === boardId);
        },
    });

    return { tasks: data, boardId, isLoading };
};
