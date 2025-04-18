import { useModal } from "@/app/providers";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useOpenModalFromRoute = (projectIdFromBoard: number) => {
    const { openModal } = useModal();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const taskIdFromState = location.state?.taskId;

        if (taskIdFromState) {
            openModal({
                mode: "Редактирование",
                taskId: taskIdFromState,
                projectIdFromBoard,
            });

            navigate(location.pathname, { replace: true });
        }
    }, [location.state?.taskId]);
};
