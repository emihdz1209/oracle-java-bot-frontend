import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CreateUserPage } from "../../features/users/pages/CreateUserPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUserPage />} />
      </Routes>
    </BrowserRouter>
  );
};