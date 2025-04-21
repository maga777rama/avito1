import { IssueCardProps } from "../model/types";
import styles from "./IssueCard.module.scss";
import { useModal } from "@/app/providers";
import { Draggable } from "@hello-pangea/dnd";
import { useParams } from "react-router-dom";

export const IssueCard = ({
    issue,
    index,
    draggable = false,
}: IssueCardProps) => {
    const { openModal } = useModal();

    const { id } = useParams<{ id: string }>();
    const boardId = Number(id);

    const handleOpenModal = () => {
        openModal({
            mode: "Редактирование",
            taskId: issue.id,
            projectIdFromBoard: issue.boardId || boardId,
        });
    };

    const content = (
        <div className={styles.card} onClick={handleOpenModal}>
            <div>
                <div className={styles.title}>{issue.title}</div>
                {!draggable && (
                    <div className={styles.status}>{issue.status}</div>
                )}
                <div className={styles.assigneeName}>
                    {issue.assignee.fullName}
                </div>
                <div className={styles.priority}>{issue.priority}</div>
            </div>
        </div>
    );

    if (!draggable) return content;

    return (
        <Draggable draggableId={issue.id.toString()} index={index!}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        marginBottom: 8,
                    }}
                >
                    {content}
                </div>
            )}
        </Draggable>
    );
};
