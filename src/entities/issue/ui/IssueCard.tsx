import { IssueCardProps } from "../model/types";
import styles from "./IssueCard.module.scss";

import { Draggable } from "@hello-pangea/dnd";

export const IssueCard = ({
    issue,
    index,
    draggable = false,
}: IssueCardProps) => {
    const content = (
        <div className={styles.card}>
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
