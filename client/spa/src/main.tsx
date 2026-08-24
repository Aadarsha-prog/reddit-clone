import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import RockPaperScissor from "./pages/rock-paper-scissor.tsx";
import TicTacToe from "./pages/tic-tac-toe.tsx";
import MainLayout from "./components/layout/main-layout/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainLayout>
      <TicTacToe />
    </MainLayout>
  </StrictMode>,
);
