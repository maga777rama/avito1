import { Board } from "../model/types";
import styles from "./BoardCard.module.scss";
import { Link } from "react-router-dom";

interface Props {
    board: Board;
}

export const BoardCard = ({ board }: Props) => {
    return (
        <div className={styles.card}>
            <div>
                <div className={styles.name}>{board.name}</div>
                <div className={styles.desc}>{board.description}</div>
                <div className={styles.count}>Задач: {board.taskCount}</div>
            </div>
            <Link className={styles.link} to={`/board/${board.id}`}>
                Перейти к доске
            </Link>
        </div>
    );
};
