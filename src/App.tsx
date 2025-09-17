// src/App.tsx

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import IndexPage from "./pages/Index";
import NotFoundPage from "./pages/NotFound";
import AuctionApp from "./components/AuctionApp"; // 옥션 앱의 메인 컴포넌트를 가져옵니다.

export default function App() {
  return (
    <Router>
      <Routes>
        {/* '/' 주소는 기존 랜딩페이지를 보여줍니다. */}
        <Route path="/" element={<IndexPage />} />
        
        {/* '/app'으로 시작하는 모든 주소는 우리가 만든 옥션 앱이 처리하도록 설정합니다. */}
        <Route path="/app/*" element={<AuctionApp />} />
        
        {/* 그 외 모든 주소는 404 페이지를 보여줍니다. */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}