import { useBoards, BoardCard } from "@/entities/board";
import { Spin } from "antd";

const BoardsPage = () => {
    const { boards, loading } = useBoards(true);

    if (loading) return <Spin />;

    return (
        <div style={{ padding: "24px" }}>
            {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
            ))}
        </div>
    );
};

export default BoardsPage;
