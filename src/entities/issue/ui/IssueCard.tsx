import { IssueCardProps } from "../model/types";
import styles from "./IssueCard.module.scss";

export const IssueCard = ({ issue }: IssueCardProps) => {
    return (
        <div className={styles.card}>
            <div>
                <div className={styles.title}>{issue.title}</div>

                <div className={styles.status}>{issue.status}</div>

                <div className={styles.assigneeName}>
                    {issue.assignee.fullName}
                </div>
                <div className={styles.priority}>{issue.priority}</div>
            </div>
        </div>
    );
};
