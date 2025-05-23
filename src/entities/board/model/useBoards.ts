import { useQuery } from "@tanstack/react-query";
import { boardApi } from "@/entities/board";

export const useBoards = (enabled: boolean) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["boards"],
        queryFn: ({ signal }) =>
            boardApi.getAll(signal).then((res) => res.data.data),
        enabled,
    });

    return {
        boards: data ?? [],
        loading: isLoading,
        error: isError,
    };
};
