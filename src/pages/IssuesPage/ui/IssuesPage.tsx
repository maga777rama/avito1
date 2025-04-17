import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useBoards } from "@/entities/board";
import styles from "./IssuesPage.module.scss";
import { useIssues, IssueCard } from "@/entities/issue";
import { Input, Select, Spin, Popover, Button } from "antd";

const IssuesPage = () => {
    const { issues, loading } = useIssues();

    // отдельно отправляется запрос на получение списка проектов
    // предполагается что возможен случай когда проект создан, но задачи еще не добавлены
    // поэтому сделал так вместо того, чтобы составлять список проектов по задачам
    const { boards } = useBoards();

    const [searchValue, setSearchValue] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedBoards, setSelectedBoards] = useState<number[]>([]);
    const [debouncedSearch] = useDebounce(searchValue, 300);

    const resetFilters = () => {
        setSelectedStatuses([]);
        setSelectedBoards([]);
    };

    const filteredIssues = issues.filter((issue) => {
        const searchText = debouncedSearch.toLowerCase();

        const matchesSearch =
            issue.title.toLowerCase().includes(searchText) ||
            issue.assignee.fullName.toLowerCase().includes(searchText);

        const matchesStatus =
            selectedStatuses.length > 0
                ? selectedStatuses.includes(issue.status)
                : true;

        const matchesBoard =
            selectedBoards.length > 0
                ? issue.boardId !== undefined &&
                  selectedBoards.includes(issue.boardId)
                : true;

        return matchesSearch && matchesStatus && matchesBoard;
    });

    const filterContent = (
        <div
            style={{
                minWidth: 250,
                display: "flex",
                flexDirection: "column",
                gap: 12,
            }}
        >
            <Select
                mode="multiple"
                placeholder="Статусы"
                value={selectedStatuses}
                onChange={setSelectedStatuses}
                allowClear
            >
                <Select.Option value="Backlog">Backlog</Select.Option>
                <Select.Option value="InProgress">In Progress</Select.Option>
                <Select.Option value="Done">Done</Select.Option>
            </Select>

            <Select
                mode="multiple"
                placeholder="Проекты"
                value={selectedBoards}
                onChange={setSelectedBoards}
                allowClear
            >
                {boards.map((board) => (
                    <Select.Option key={board.id} value={board.id}>
                        {board.name}
                    </Select.Option>
                ))}
            </Select>

            <Button onClick={resetFilters}>Сбросить фильтры</Button>
        </div>
    );

    if (loading) return <Spin />;

    return (
        <div className={styles.IssuesPage}>
            <div
                className={styles.controls}
                style={{ display: "flex", gap: 16 }}
            >
                <Input
                    placeholder="Поиск по названию или исполнителю"
                    size={"large"}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    allowClear
                    style={{ width: 300 }}
                />

                <Popover
                    content={filterContent}
                    title="Фильтры"
                    trigger="click"
                >
                    <Button
                        size={"large"}
                        type={
                            selectedStatuses.length || selectedBoards.length
                                ? "primary"
                                : "default"
                        }
                        color="red"
                    >
                        Фильтры
                    </Button>
                </Popover>
            </div>

            <div style={{ marginTop: 16 }}>
                {filteredIssues.map((issue) => (
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
