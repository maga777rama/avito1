import { Navigate, Route, Routes } from "react-router-dom";
import BoardsPage from "@/pages/BoardsPage";
import IssuesPage from "@/pages/IssuesPage";
import { Header } from "@/widgets/Header";

export const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/boards" element={<BoardsPage />} />
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="*" element={<Navigate to="/boards" />} />
            </Routes>
        </div>
    );
};
