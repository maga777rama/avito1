import { useQuery } from "@tanstack/react-query";
import { issueApi } from "@/entities/issue";

export const useIssues = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["issues"],
        queryFn: ({ signal }) =>
            issueApi.getAll(signal).then((res) => res.data.data),
    });

    return {
        issues: data ?? [],
        loading: isLoading,
        error: isError,
    };
};
