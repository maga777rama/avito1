import { lazy } from "react";
import { Header } from "@/widgets/Header";
import { Navigate, Route, Routes } from "react-router-dom";

const IssuesPage = lazy(() => import("@/pages/IssuesPage"));
const BoardsPage = lazy(() => import("@/pages/BoardsPage"));
const BoardPage = lazy(() => import("@/pages/BoardPage"));
const Modal = lazy(() => import("@/features/taskModal"));

export const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/boards" element={<BoardsPage />} />
                <Route path="/board/:id" element={<BoardPage />} />
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="*" element={<Navigate to="/boards" />} />
            </Routes>
            <Modal />
        </div>
    );
};
