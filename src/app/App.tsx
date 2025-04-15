import { Navigate, Route, Routes } from "react-router-dom";
import BoardsPage from "@/pages/BoardsPage";

export const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/boards" element={<BoardsPage />} />
                <Route path="*" element={<Navigate to="/boards" />} />
            </Routes>
        </div>
    );
};
