import { useQuery } from "@tanstack/react-query";
import { boardApi } from "@/entities/board";

export const useBoard = (id: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["board", id],
        queryFn: ({ signal }) =>
            boardApi.getBoardTasks(id, signal).then((res) => res.data.data),
    });

    return {
        tasks: data ?? [],
        loading: isLoading,
        error: isError,
    };
};
