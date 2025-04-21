import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldType } from "@/features/taskModal";
import { issueApi, Issue } from "@/entities/issue";

export const useUpdateTask = (boardId: number | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, values }: { id: number; values: FieldType }) =>
            issueApi.updateTask(id, values).then((r) => r.data),
        onSuccess: (_, { id, values }) => {
            queryClient.setQueriesData<Issue[]>(
                { queryKey: ["issues"] },
                (old) =>
                    old?.map((t) => (t.id === id ? { ...t, ...values } : t)),
            );

            queryClient.setQueriesData<Issue[]>(
                { queryKey: ["board", boardId] },
                (old) =>
                    old?.map((t) => (t.id === id ? { ...t, ...values } : t)),
            );

            queryClient.invalidateQueries({ queryKey: ["issues"] });
            queryClient.invalidateQueries({ queryKey: ["board", boardId] });
        },
    });
};
