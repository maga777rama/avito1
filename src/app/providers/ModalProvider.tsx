import React, { createContext, useReducer, useContext } from "react";
import {
    ModalContextType,
    ModalState,
} from "@/features/taskModal/model/types.ts";

const initialState: ModalState = {
    open: false,
    mode: "Создание",
    projectIdFromBoard: undefined,
    taskId: undefined,
};

type Action =
    | { type: "OPEN"; payload: Partial<ModalState> }
    | { type: "CLOSE" };

function reducer(state: ModalState, action: Action): ModalState {
    switch (action.type) {
        case "OPEN":
            return { ...state, ...action.payload, open: true };
        case "CLOSE":
            return { ...initialState };
        default:
            return state;
    }
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openModal = (params: Partial<ModalState>) => {
        dispatch({ type: "OPEN", payload: params });
    };

    const closeModal = () => {
        dispatch({ type: "CLOSE" });
    };

    return (
        <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("ошибка с модалкой");
    return context;
};
