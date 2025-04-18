import { Droppable } from "@hello-pangea/dnd";
import { IssueCard } from "@/entities/issue";
import { BoardColumnProps } from "@/pages/BoardPage";
import styles from "./Board.module.scss";

export const BoardColumn = ({ title, status, tasks }: BoardColumnProps) => {
    return (
        <div className={styles.column}>
            <h3 className={styles.columnTitle}>{title}</h3>
            <Droppable droppableId={status}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.droppableArea}
                    >
                        {tasks.map((task, index) => (
                            <IssueCard
                                key={task.id}
                                issue={task}
                                index={index}
                                draggable={true}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
