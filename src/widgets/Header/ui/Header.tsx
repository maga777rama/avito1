import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { useModal } from "@/app/providers";
import { Button } from "antd";

export const Header = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.startsWith(path);
    const { openModal } = useModal();
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.tabs}>
                    <Link
                        to="/issues"
                        className={`${styles.tab} ${isActive("/issues") ? styles.active : ""}`}
                    >
                        Все задачи
                    </Link>
                    <Link
                        to="/boards"
                        className={`${styles.tab} ${isActive("/boards") ? styles.active : ""}`}
                    >
                        Проекты
                    </Link>
                </div>
                <Button
                    size={"large"}
                    onClick={() =>
                        openModal({
                            mode: "Создание",
                        })
                    }
                >
                    Создать задачу
                </Button>
            </nav>
        </header>
    );
};
