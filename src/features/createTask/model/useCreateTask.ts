import { useMutation, useQueryClient } from "@tanstack/react-query";
import { issueApi } from "@/entities/issue";
import { FieldType } from "@/features/taskModal";

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: FieldType) => {
            const { status, ...rest } = values;
            const res = await issueApi.createTask(rest);
            const createdId = res.data.data.id;

            if (status !== "Backlog") {
                await issueApi.updateTaskStatus(createdId, status);
            }

            return createdId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issues"] });
        },
    });
};
