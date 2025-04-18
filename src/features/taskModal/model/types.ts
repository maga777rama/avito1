import { TaskPriority, TaskStatus } from "@/entities/issue/model/types.ts";

export type FieldType = {
    title: string;
    description: string;
    boardId: number;
    priority: TaskPriority;
    assigneeId: number;
    status: TaskStatus;
};

export interface IModalProps {
    open: boolean;
    mode: string;
    showGoToBoardButton: boolean;
    projectIdFromBoard?: string;
}

// types.ts
export type ModalMode = "Создание" | "Редактирование";

export interface ModalState {
    open: boolean;
    mode: ModalMode;
    projectIdFromBoard?: number;
    taskId?: number;
}

export interface ModalContextType extends ModalState {
    openModal: (params: Partial<ModalState>) => void;
    closeModal: () => void;
}
