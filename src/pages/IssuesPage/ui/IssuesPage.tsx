import styles from "./IssuesPage.module.scss";
import { useIssues, IssueCard } from "@/entities/issue";
import { Spin, Button } from "antd";

const IssuesPage = () => {
    const { issues, loading } = useIssues();

    if (loading) return <Spin />;

    return (
        <div className={styles.IssuesPage}>
            <div style={{ marginTop: 16 }}>
                {issues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
            <div className={styles.createButton}>
                <Button size={"large"}>Создать задачу</Button>
            </div>
        </div>
    );
};

export default IssuesPage;
