import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/entities/user/api/userApi.ts";

export const useUsers = (enabled: boolean) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: ({ signal }) =>
            userApi.getAll(signal).then((res) => res.data.data),
        enabled,
    });

    return {
        users: data ?? [],
        loading: isLoading,
        error: isError,
    };
};
