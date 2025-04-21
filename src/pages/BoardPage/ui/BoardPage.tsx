import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { BoardColumn } from "./BoardColumn.tsx";
import { TaskStatus } from "@/entities/issue";
import { useOpenModalFromRoute } from "@/shared/lib/hooks";
import { useUpdateTaskStatus } from "@/features/updateTaskStatus";
import { useBoard } from "@/entities/board";
import styles from "./Board.module.scss";
import { useParams } from "react-router-dom";
const BoardPage = () => {
    const { id } = useParams<{ id: string }>();
    const boardId = Number(id);

    const { tasks, loading } = useBoard(boardId);

    useOpenModalFromRoute(boardId);

    const { mutate: updateStatus } = useUpdateTaskStatus(boardId);

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination || destination.droppableId === source.droppableId)
            return;

        updateStatus({
            taskId: Number(draggableId),
            status: destination.droppableId as TaskStatus,
        });
    };

    const columns = {
        Backlog: tasks.filter((t) => t.status === "Backlog"),
        InProgress: tasks.filter((t) => t.status === "InProgress"),
        Done: tasks.filter((t) => t.status === "Done"),
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className={styles.boardPage}>
            <div>
                <h2 className={styles.projectName}>{"Название проекта"}</h2>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className={styles.columnsBlock}>
                    <BoardColumn
                        title="To do"
                        status="Backlog"
                        tasks={columns.Backlog}
                    />
                    <BoardColumn
                        title="In progress"
                        status="InProgress"
                        tasks={columns.InProgress}
                    />
                    <BoardColumn
                        title="Done"
                        status="Done"
                        tasks={columns.Done}
                    />
                </div>
            </DragDropContext>
        </div>
    );
};

export default BoardPage;
