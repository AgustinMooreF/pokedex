import "./App.css";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./pages/MainLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MainLayout />} />
        {/* <Route path="/question" element={<ProfileQuestions />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
