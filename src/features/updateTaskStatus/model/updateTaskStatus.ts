import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Issue, TaskStatus, issueApi } from "@/entities/issue";

export const useUpdateTaskStatus = (boardId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            taskId,
            status,
        }: {
            taskId: number;
            status: TaskStatus;
        }) => issueApi.updateTaskStatus(taskId, status),
        onMutate: async ({ taskId, status }) => {
            // отмена текущих запросов чтоб они не затирали кеш
            await queryClient.cancelQueries({ queryKey: ["issues"] });
            await queryClient.cancelQueries({ queryKey: ["issues", boardId] });

            // на случай возникновения ошибки при выполнении запроса, сохраняем копию старого кеша
            const previousAll = queryClient.getQueryData<Issue[]>(["issues"]);
            const previousBoard = queryClient.getQueryData<Issue[]>([
                "issues",
                boardId,
            ]);

            const patch = (arr?: Issue[]) =>
                arr?.map((t) => (t.id === taskId ? { ...t, status } : t));

            // патчим изменения локально
            queryClient.setQueryData(["issues"], patch);
            queryClient.setQueryData(["issues", boardId], patch);

            return { previousAll, previousBoard };
        },
        // если ошибка то возвращаем старые данные
        onError: (_err, _vars, ctx) => {
            if (ctx?.previousAll)
                queryClient.setQueryData(["issues"], ctx.previousAll);
            if (ctx?.previousBoard)
                queryClient.setQueryData(
                    ["issues", boardId],
                    ctx.previousBoard,
                );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["issues"] });
            queryClient.invalidateQueries({ queryKey: ["issues", boardId] });
        },
    });
};
